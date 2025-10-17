import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SelectComponentProps {
  content: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SelectComponent({ content, options, value, onChange }: SelectComponentProps) {

  return (
    <div>
      <FormControl
        fullWidth
        size="small"
        variant="outlined"
        sx={{
          '& .MuiInputLabel-root': { fontWeight: 600, fontFamily: 'Poppins, Roboto, sans-serif' },
          '& .MuiOutlinedInput-root': {
            borderRadius: 2.5,
            fontFamily: 'Poppins, Roboto, sans-serif',
            backgroundColor: '#f9fafb',
            '& fieldset': { borderColor: '#e5e7eb' },
            '&:hover fieldset': { borderColor: '#cbd5e1' },
            '&.Mui-focused fieldset': { borderColor: '#1976d2', boxShadow: '0 0 0 3px rgba(25,118,210,0.16)' },
          },
        }}
      >
        <InputLabel id="demo-simple-select-helper-label" shrink>{content}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label={content}
          onChange={(e) => onChange((e.target as HTMLInputElement).value)}
          fullWidth
          IconComponent={ExpandMoreIcon}
          MenuProps={{
            PaperProps: {
              elevation: 3,
              sx: { borderRadius: 2, mt: 1, maxHeight: 360 },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{ fontFamily: 'Poppins, Roboto, sans-serif', fontSize: 14 }}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
