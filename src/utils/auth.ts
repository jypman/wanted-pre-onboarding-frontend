export const isValidEmail = (email: string): boolean => {
  return email.indexOf("@") > -1;
};
export const isValidPwd = (password: string): boolean => {
  return password.length >= 8;
};
