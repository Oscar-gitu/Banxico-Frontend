import DatePicker, { DateObject } from "react-multi-date-picker";
import FormControl from '@mui/material/FormControl';
import './DatePicker.css';
import gregorian from "react-date-object/calendars/gregorian";

interface DatePickerComponentProps {
  value: DateObject[]; // range mode
  onChange: (value: DateObject[]) => void;
}

export default function DatePickerComponent({ value, onChange }: DatePickerComponentProps) {

  return (
    <FormControl fullWidth size="small">
      <DatePicker
        value={value}
        onChange={(date) => {
          if (Array.isArray(date)) onChange(date as DateObject[]);
        }}
        range
        onlyYearPicker={false}
        onlyMonthPicker={false}
        format="DD/MM/YYYY"
        calendar={gregorian}
        containerClassName="mui-date-picker"
        inputClass="mui-input mui-input-with-icon"
        placeholder="Selecciona el rango de fechas"
      />
    </FormControl>
  );
}
