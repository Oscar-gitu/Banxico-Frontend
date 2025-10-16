import type { BanxicoDato } from './banxico';
import type { DateObject } from 'react-multi-date-picker';

export interface CardComponentProps {
  title: string;
  content: string;
  titleTooltip?: string;
}

export interface TableComponentProps {
  values?: BanxicoDato[];
}

export interface SimpleLineChartProps {
  values?: BanxicoDato[];
}

export interface DatePickerComponentProps {
  value: DateObject[]; // range mode
  onChange: (value: DateObject[]) => void;
}
