import apiClient from './axiosService';

const BASE_URL = "https://fxkv9k8g6g.execute-api.us-east-1.amazonaws.com/dev/banxico";

function toYmd(date: Date | string): string {
  if (typeof date === 'string') return date;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export async function getSeriesData<T = any>(
  seriesIds: string | string[],
  startDate: Date | string,
  endDate: Date | string
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
