import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';

export default function TableRowsSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton variant="text" animation="wave" width={120} height={24} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" animation="wave" width={120} height={24} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
