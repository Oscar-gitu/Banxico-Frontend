export function parseDateDMY(ddmmyyyy: string): number {
  const [dd, mm, yyyy] = (ddmmyyyy || '').split('/').map((x) => parseInt(x, 10));
  if (!yyyy || !mm || !dd) return 0;
  return new Date(yyyy, mm - 1, dd).getTime();
}

export function parseNumberLoose(input: string): number {
  const n = Number((input || '').toString().replace(/,/g, ''));
  return Number.isNaN(n) ? 0 : n;
}

export function quoteCsvField(s: string): string {
  return '"' + String(s).replace(/"/g, '""') + '"';
}

export function buildCsv(
  rows: Array<{ fecha: string; dato: string }>,
  header: string[] = ['Fecha', 'Valor']
): string {
  const lines = rows.map((r) => `${quoteCsvField(r.fecha)},${quoteCsvField(r.dato)}`);
  return [header.join(','), ...lines].join('\n');
}
