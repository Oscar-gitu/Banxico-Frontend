import apiClient from './axiosService';

const BASE_URL = import.meta.env.VITE_ENVIRONMENT === 'development' ? '/banxico/SieAPIRest/service/v1/series' : 'https://www.banxico.org.mx/SieAPIRest/service/v1/series';

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
  const url = `${BASE_URL}/${ids}/datos/${start}/${end}`;
  // Bmx-Token header se añade automáticamente en apiClient
  const res = await apiClient.get<T>(url);
  return res.data;
}

export default {
  getSeriesData,
};
