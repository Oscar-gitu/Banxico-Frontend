import apiClient from './axiosService';
import type { BanxicoResponse } from '../../types/banxico';

const BASE_URL = "https://fxkv9k8g6g.execute-api.us-east-1.amazonaws.com/dev/banxico";

type DateLike = Date | string | { format?: (fmt: string) => string; toDate?: () => Date };

function toYmd(date: DateLike): string {
  if (!date) return '';
  if (typeof date === 'string') return date;
  // react-multi-date-picker DateObject supports format('YYYY-MM-DD') or toDate()
  if (typeof date === 'object' && date !== null && 'format' in date) {
    const d = date as { format?: (fmt: string) => string };
    if (typeof d.format === 'function') return d.format('YYYY-MM-DD');
  }
  if (typeof date === 'object' && date !== null && 'toDate' in date) {
    const toDateFn = (date as { toDate?: () => Date }).toDate;
    if (typeof toDateFn === 'function') {
      date = toDateFn();
    }
  }
  const jsDate: Date = date instanceof Date ? date : new Date(date as string);
  const y = jsDate.getFullYear();
  const m = String(jsDate.getMonth() + 1).padStart(2, '0');
  const d = String(jsDate.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export async function getSeriesData<T = BanxicoResponse>(
  seriesIds: string | string[],
  startDate: DateLike,
  endDate: DateLike
) {
  const ids = Array.isArray(seriesIds) ? seriesIds.join(',') : seriesIds;
  const start = toYmd(startDate);
  const end = toYmd(endDate);
  const url = `${BASE_URL}`;
  // Bmx-Token header se añade automáticamente en apiClient
  const res = await apiClient.get<T>(url, { serieId: ids, start, end });
  return res.data;
}

export default {
  getSeriesData,
};
