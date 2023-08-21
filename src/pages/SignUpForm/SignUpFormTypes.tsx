export type SignUpFormProps = {
  setIsLoading: (value: boolean) => void;
};

export type FormData = {
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  email: string;
  password: string;
};

export type ValidatedFormInputs = {
  isValid: boolean;
};
