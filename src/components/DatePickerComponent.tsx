import DatePicker, { DateObject } from "react-multi-date-picker";
import FormControl from '@mui/material/FormControl';
import './DatePicker.css';
import gregorian from "react-date-object/calendars/gregorian";

const spanish: any = {
  name: "spanish",
  months: [
    ["enero", "ene"],
    ["febrero", "feb"],
    ["marzo", "mar"],
    ["abril", "abr"],
    ["mayo", "may"],
    ["junio", "jun"],
    ["julio", "jul"],
    ["agosto", "ago"],
    ["septiembre", "sep"],
    ["octubre", "oct"],
    ["noviembre", "nov"],
    ["diciembre", "dic"],
  ],
  weekDays: [
    ["domingo", "dom"],
    ["lunes", "lun"],
    ["martes", "mar"],
    ["miércoles", "mié"],
    ["jueves", "jue"],
    ["viernes", "vie"],
    ["sábado", "sáb"],
  ],
  digits: ["0","1","2","3","4","5","6","7","8","9"],
  rtl: false,
  meridiems: [
    { name: "a. m.", short: "AM" },
    { name: "p. m.", short: "PM" },
  ],
};

interface DatePickerComponentProps {
  value: any;
  onChange: (value: any) => void;
}

export default function DatePickerComponent({ value, onChange }: DatePickerComponentProps) {

  return (
    <FormControl fullWidth size="small">
      <DatePicker
        value={value}
        onChange={onChange}
        range
        currentDate={
          (() => {
            const v = Array.isArray(value) ? value[1] : value;
            return v instanceof DateObject ? v : new DateObject(v);
          })()
        }
        onlyYearPicker={false}
        onlyMonthPicker={false}
        format="DD/MM/YYYY"
        calendar={gregorian}
        locale={spanish}
        containerClassName="mui-date-picker"
        inputClass="mui-input"
      />
    </FormControl>
  );
}
