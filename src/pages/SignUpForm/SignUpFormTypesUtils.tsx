// Types
import { FormData, ValidatedFormInputs } from './SignUpFormTypes';

export const inputFields = [
  { label: 'First Name', name: 'firstName', type: 'text' },
  { label: 'Last Name', name: 'lastName', type: 'text' },
  { label: 'State', name: 'state', type: 'state' },
  { label: 'City', name: 'city', type: 'city' },
  { label: 'Email', name: 'email', type: 'email' },
  { label: 'Password', name: 'password', type: 'password' },
];

export const formDataDefaultvalues = {
  firstName: '',
  lastName: '',
  state: '',
  city: '',
  email: '',
  password: '',
};

export const validateFormInputs = (data: FormData): ValidatedFormInputs => {
  const isAllFieldsFilled = Object.values(data).every(
    (value) => value.trim() !== '',
  );

  return {
    isValid: isAllFieldsFilled,
  };
};

export const defineLabel = (
  label: string,
  type: string,
  loadingCities: boolean,
): string => {
  return `${label} ${
    type === 'city' && loadingCities ? '- Loading cities...' : ''
  }`;
};
