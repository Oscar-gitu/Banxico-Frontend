import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import type { BanxicoDato } from '../types/banxico';
import TableRowsSkeleton from './skeletons/TableRowsSkeleton';
import { parseDateDMY, parseNumberLoose, buildCsv } from '../utils/format';

export default function TableComponent({ values }: { values?: BanxicoDato[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [orderBy, setOrderBy] = React.useState<'fecha' | 'dato'>('fecha');
  const [order, setOrder] = React.useState<'asc' | 'desc'>('desc');

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = Array.isArray(values) ? values : [];

  const parseDate = parseDateDMY;
  const parseNumber = parseNumberLoose;

  const comparator = React.useCallback((a: BanxicoDato, b: BanxicoDato): number => {
    let cmp = 0;
    if (orderBy === 'fecha') {
      cmp = parseDate(a.fecha) - parseDate(b.fecha);
    } else {
      cmp = parseNumber(a.dato) - parseNumber(b.dato);
    }
    return order === 'asc' ? cmp : -cmp;
  }, [orderBy, order]);

  const sorted = React.useMemo(() => {
    const copy = rows.slice();
    copy.sort(comparator);
    return copy;
  }, [rows, comparator]);

  const handleRequestSort = (property: 'fecha' | 'dato') => () => {
    if (orderBy === property) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setOrderBy(property);
      setOrder('desc');
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <Button
          variant="outlined"
          size="small"
          disabled={rows.length === 0}
          onClick={() => {
            const pageRows = rowsPerPage > 0
              ? sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : sorted;
            const csv = buildCsv(pageRows);
            const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'datos.csv';
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Descargar CSV
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 120 }} sortDirection={orderBy === 'fecha' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'fecha'}
                  direction={orderBy === 'fecha' ? order : 'asc'}
                  onClick={handleRequestSort('fecha')}
                >
                  Fecha
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ minWidth: 120 }} sortDirection={orderBy === 'dato' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'dato'}
                  direction={orderBy === 'dato' ? order : 'asc'}
                  onClick={handleRequestSort('dato')}
                >
                  Valor
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0
              ? <TableRowsSkeleton rows={8} />
              : (rowsPerPage > 0
                  ? sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : sorted
                ).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={`${row.fecha}-${row.dato}`}>
                    <TableCell>{row.fecha}</TableCell>
                    <TableCell>{row.dato}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[100, 500, { label: 'Todos', value: -1 }]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
