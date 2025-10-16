import { TextField } from '@mui/material';

interface SearchBarProps {
  onChange: (value: string) => void;
}

export const InputSearch = ({ onChange }: SearchBarProps) => {
  return (
    <TextField
      placeholder="Szukaj po tytule lub treści..."
      aria-label="Input to search for posts by content "
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  );
};
