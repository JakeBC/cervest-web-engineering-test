import { useId } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  value: string;
  options: string[];
  label: string;
  handleChange: (event: SelectChangeEvent) => void;
};

const SelectList = ({ value = 'France', options, label, handleChange }: Props) => {
  const id = useId();

  return (
    <FormControl>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value="">-</MenuItem>
        { options.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
      </Select>
      <FormHelperText>{`Select a ${label}`}</FormHelperText>
    </FormControl>
  );
};

export default SelectList;