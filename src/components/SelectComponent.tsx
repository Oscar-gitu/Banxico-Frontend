import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface SelectComponentProps {
    content: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

export default function SelectComponent({ content, options, value, onChange }: SelectComponentProps) {

  return (
    <div>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-helper-label">{content}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label={content}
          onChange={(e) => onChange((e.target as HTMLInputElement).value)}
          fullWidth  
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
