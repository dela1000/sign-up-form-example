import { useState, ChangeEvent } from 'react';
import { TextInputProps } from './TextTypes';
import styles from '../SharedInputStyles/SharedInputStyles.module.css';

const TextInput = ({
  onInputChange,
  name,
  placeholder,
  type,
}: TextInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onInputChange(newValue);
  };

  return (
    <input
      className={styles.input}
      type={type || 'text'}
      value={inputValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      maxLength={40}
    />
  );
};

export default TextInput;
