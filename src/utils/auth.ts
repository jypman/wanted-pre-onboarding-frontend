export const MIN_PWD_LENGTH: number = 8;
export const ACCESS_TOKEN_KEY = "accessToken";

export const isValidEmail = (email: string): boolean => {
  return email.indexOf("@") > -1;
};
export const isValidPwd = (password: string): boolean => {
  return password.length >= MIN_PWD_LENGTH;
};
