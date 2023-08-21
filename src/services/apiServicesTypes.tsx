export type State = {
  state_name: string;
};

export type City = {
  city_name: string;
};

export type ErrorResponse = {
  error: {
    name?: string;
    message?: string;
    expiredAt?: string;
  };
};

export type BuildHeaders = {
  Authorization: string;
  Accept: string;
};
