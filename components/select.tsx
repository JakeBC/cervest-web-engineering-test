import { useId } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type Props = {
  value: string;
  options: string[];
  label: string;
  handleChange: (value: string) => void;
};

const SelectList = ({ value = 'France', options, label, handleChange }: Props) => {
  const id = useId();
  const onChange = (event: SelectChangeEvent) => {
    handleChange(event.target.value as string);
  }

  return (
    <FormControl>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        id={id}
        value={value}
        label={label}
        onChange={onChange}
      >
        <MenuItem value="">-</MenuItem>
        { options.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
      </Select>
      <FormHelperText>{`Select a ${label}`}</FormHelperText>
    </FormControl>
  );
};

export default SelectList;