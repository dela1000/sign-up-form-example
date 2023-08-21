import { useState, useEffect } from 'react';
import { DropdownInputProps } from './DropdownTypes';
import styles from '../SharedInputStyles/SharedInputStyles.module.css';

const DropdownInput = ({
  onInputChange,
  options,
  dataType,
  placeholder,
  updatedState,
  disabled,
}: DropdownInputProps) => {
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    setSelectedValue('');
  }, [updatedState]);

  const optionKey = dataType === 'city' ? 'city_name' : 'state_name';

  return (
    <select
      className={styles.input}
      onChange={(event) => {
        setSelectedValue(event.target.value);
        onInputChange(event.target.value);
      }}
      value={selectedValue}
      disabled={disabled}>
      <option value="" disabled>
        {placeholder || 'Select an option'}
      </option>
      {options.map((option, index) => (
        <option key={`${option[optionKey]}${index}`} value={option[optionKey]}>
          {option[optionKey]}
        </option>
      ))}
    </select>
  );
};

export default DropdownInput;
