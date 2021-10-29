const AUTH_TOKEN_NAME = 'user-token';

export type Token = string;

export const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_NAME) ?? '';

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_NAME);
};
