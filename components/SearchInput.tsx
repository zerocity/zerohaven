import { Input, InputProps } from '@chakra-ui/react';
import * as React from 'react';
import useDebounce from '@@/hook/useDebounce';

export interface SearchInputProps extends InputProps {
  onDebounce: (value: string) => void;
}

export function SearchInput({ onDebounce, ...props }: SearchInputProps) {
  const [value, setValue] = React.useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);
  React.useEffect(
    () => onDebounce(debouncedValue),
    [onDebounce, debouncedValue]
  );
  return (
    <Input type="text" onChange={(e) => setValue(e.target.value)} {...props} />
  );
}
