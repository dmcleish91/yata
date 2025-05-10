export type User = {
  isLoggedIn: boolean;
  email?: string;
};

export type AuthError = {
  message: string;
  code: number;
};

export type APIResponse<T> = {
  message: string;
  data: T;
};
