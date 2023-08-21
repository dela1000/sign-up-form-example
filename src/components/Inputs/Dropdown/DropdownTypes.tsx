export type DropdownInputProps = {
  onInputChange: (input: string) => void;
  options: { [key: string]: string }[];
  dataType: 'city' | 'state';
  placeholder?: string;
  updatedState?: string;
  disabled?: boolean;
};
