import { useState, useEffect, FormEvent } from 'react';

// Styles
import styles from './SignUpForm.module.css';

// Components
import TextInput from '../../components/Inputs/Text/Text';
import DropdownInput from '../../components/Inputs/Dropdown/Dropdown';

// Service
import { getStatesData, getCitiesData } from '../../services/apiServices';

// Types
import { State, City, ErrorResponse } from '../../services/apiServicesTypes';
import {
  FormData,
  SignUpFormProps,
  ValidatedFormInputs,
} from './SignUpFormTypes';

// Utils
import {
  formDataDefaultvalues,
  inputFields,
  validateFormInputs,
  defineLabel,
} from './SignUpFormTypesUtils';

const SignUpForm = ({ setIsLoading }: SignUpFormProps) => {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [ifValidated, setIfValidated] = useState<boolean | null>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loadingCities, setLoadingCities] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(formDataDefaultvalues);

  const handleSetFormData = (field: string, value: string): void => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value.trim(),
    }));
  };

  const handleInputChange = (field: string, value: string): void => {
    handleSetFormData(field, value);
  };

  const handleRequestError = (
    type: string,
    error: ErrorResponse | unknown,
  ): void => {
    type === 'cities' ? setCities([]) : setStates([]);
    console.error('Error fetching cities data:', error);
    setErrorMessage(
      `An error occurred while fetching ${type}. Please reload the page. Sorry about that! Please let us know if the issue persists.`,
    );
    setIsLoading(false);
  };

  const handleStateChange = async (stateName: string): Promise<void> => {
    try {
      setIsLoading(true);
      setLoadingCities(true);
      const fetchedCities: City[] | ErrorResponse = await getCitiesData(
        stateName,
      );
      if ('error' in fetchedCities) {
        handleRequestError('cities', fetchedCities);
      } else {
        setCities(fetchedCities);
        handleSetFormData('state', stateName);
        handleSetFormData('city', '');
        setIsLoading(false);
        setLoadingCities(false);
      }
    } catch (error) {
      handleRequestError('cities', error);
    }
  };

  const checkEmailValidity = (email: string): void => {
    const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setIsEmailValid(regexForEmail.test(email));
  };

  const checkPasswordValidity = (password: string): void => {
    setIsPasswordValid(password.length >= 10 && !/\s/.test(password));
  };

  const setWarningClass = (inputName: string): string => {
    if (inputName !== 'email' && inputName !== 'password') {
      return !ifValidated && formData[inputName as keyof FormData].length === 0
        ? styles.warning
        : '';
    } else if (inputName === 'email') {
      return !ifValidated && !isEmailValid ? styles.warning : '';
    } else if (inputName === 'password') {
      return !ifValidated && !isPasswordValid ? styles.warning : '';
    }

    return '';
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setIfValidated(null);
    const validation: ValidatedFormInputs = validateFormInputs(formData);

    setIfValidated(validation.isValid && isEmailValid && isPasswordValid);

    if (!validation.isValid || !isEmailValid || !isPasswordValid) {
      setTimeout(() => {
        setIfValidated(null);
      }, 5000);
      return;
    }

    console.log('formData: ', JSON.stringify(formData, null, 4));
  };

  useEffect(() => {
    checkEmailValidity(formData.email);
  }, [formData.email]);

  useEffect(() => {
    checkPasswordValidity(formData.password);
  }, [formData.password]);

  useEffect(() => {
    const fetchStatesData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const fetchedStates: State[] | ErrorResponse = await getStatesData();

        if ('error' in fetchedStates) {
          handleRequestError('states', fetchedStates);
        } else {
          setStates(fetchedStates);
          setIsLoading(false);
        }
      } catch (error) {
        handleRequestError('states', error);
      }
    };

    fetchStatesData();
  }, []);

  return (
    <div className={styles.formContainer}>
      {errorMessage ? (
        <div className={styles.errorMessageContainer}>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {inputFields.map((input) => (
            <div key={input.name} className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor={input.name}>
                {defineLabel(input.label, input.type, loadingCities)}
              </label>
              <div>
                <div className={setWarningClass(input.name)}>
                  {input.type === 'state' ? (
                    <DropdownInput
                      onInputChange={handleStateChange}
                      options={states}
                      placeholder={`Select ${input.label}`}
                      dataType={input.type}
                    />
                  ) : input.type === 'city' ? (
                    <div>
                      <DropdownInput
                        updatedState={formData.state}
                        onInputChange={(value) =>
                          handleInputChange(input.name, value)
                        }
                        options={cities}
                        placeholder={`Select ${input.label}`}
                        dataType={input.type}
                        disabled={!formData.state}
                      />
                    </div>
                  ) : (
                    <div>
                      <TextInput
                        onInputChange={(value) =>
                          handleInputChange(input.name, value)
                        }
                        name={input.name}
                        placeholder={input.label}
                        type={input.type}
                      />
                    </div>
                  )}
                </div>
                {input.type === 'password' && (
                  <p className={styles.passwordText}>
                    Password must be at least 10 characters long with no spaces
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className={styles.formButtonContainer}>
            <div>
              {ifValidated === false && (
                <p className={styles.warningText}>
                  Please complete all the available options correctly
                </p>
              )}
            </div>
            <button className={styles.submitButton} type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUpForm;
