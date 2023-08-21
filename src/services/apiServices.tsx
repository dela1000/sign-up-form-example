import { State, City, ErrorResponse, BuildHeaders } from './apiServicesTypes';

const API_URL = 'https://www.universal-tutorial.com/api';

export const getAuthToken = async (): Promise<void> => {
  const headers = {
    'api-token': process.env.REACT_APP_UNIVERSAL_TUTORIAL_TOKEN || '',
    'user-email': process.env.REACT_APP_USER_EMAIL || '',
  };

  const response = await fetch(`${API_URL}/getaccesstoken`, {
    headers,
  });
  const data = await response.json();

  if (data.auth_token && data.auth_token.length) {
    localStorage.setItem('samplesignupauthtoken', data.auth_token);
    localStorage.setItem(
      'samplesignupauthtokenloadtime',
      JSON.stringify(Math.floor(new Date().getTime())),
    );
  } else {
    throw new Error(`Unable to retrieve Auth Token. ${data?.error}`);
  }
};

const checkLocalStorageForTokenValidity = async (): Promise<void> => {
  const tokenFromStorage = localStorage.getItem('samplesignupauthtoken');
  const tokenStorageTime = localStorage.getItem(
    'samplesignupauthtokenloadtime',
  );

  if (
    tokenFromStorage &&
    tokenFromStorage.length &&
    tokenStorageTime &&
    tokenStorageTime.length
  ) {
    const storedTime = new Date(Number(tokenStorageTime));
    const currentTime = new Date();
    const timeDiff = currentTime.getTime() - storedTime.getTime();
    const twelveHoursMilliseconds = 1000 * 60 * 60 * 12;

    if (timeDiff > twelveHoursMilliseconds) {
      localStorage.removeItem('samplesignupauthtoken');
      localStorage.removeItem('samplesignupauthtokenloadtime');
      await getAuthToken();
    }
  } else {
    await getAuthToken();
  }
};

const buildHeaders = (): BuildHeaders => {
  const tokenFromStorage = localStorage.getItem('samplesignupauthtoken');
  return {
    Authorization: `Bearer ${tokenFromStorage}`,
    Accept: 'application/json',
  };
};

export const getStatesData = async (): Promise<State[] | ErrorResponse> => {
  await checkLocalStorageForTokenValidity();

  const headers = buildHeaders();

  const response = await fetch(`${API_URL}/states/United States`, {
    headers,
  });

  return await response.json();
};

export const getCitiesData = async (
  stateName: string,
): Promise<City[] | ErrorResponse> => {
  await checkLocalStorageForTokenValidity();

  const headers = buildHeaders();

  const response = await fetch(`${API_URL}/cities/${stateName}`, {
    headers,
  });

  return await response.json();
};
