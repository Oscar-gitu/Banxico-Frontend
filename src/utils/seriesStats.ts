import type { BanxicoDato, MinMax } from '../types/banxico';

export function getMinMaxFromDatos(datos: BanxicoDato[] | undefined | null): MinMax {
  if (!Array.isArray(datos) || datos.length === 0) return { min: null, max: null };
  let minNum: number | null = null;
  let maxNum: number | null = null;
  let minStr: string | null = null;
  let maxStr: string | null = null;

  for (const item of datos) {
    if (!item || typeof item.dato !== 'string') continue;
    const cleaned = item.dato.replace(/,/g, '');
    const v = Number(cleaned);
    if (Number.isNaN(v)) continue;
    if (minNum === null || v < minNum) {
      minNum = v;
      minStr = item.dato;
    }
    if (maxNum === null || v > maxNum) {
      maxNum = v;
      maxStr = item.dato;
    }
  }

  return { min: minStr, max: maxStr };
}
