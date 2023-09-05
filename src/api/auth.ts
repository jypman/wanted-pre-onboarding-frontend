import http from "./http";
import { API } from "./constants";

interface IReqSignup {
  email: string;
  password: string;
}
export const requestSignup = async ({
  email,
  password,
}: IReqSignup): Promise<void> => {
  return http.post(API.SIGN_UP, { email, password });
};

interface IReqSignin {
  email: string;
  password: string;
}
export interface IResSignin {
  access_token: string;
}
export const requestSignin = async ({
  email,
  password,
}: IReqSignin): Promise<IResSignin> => {
  return http.post(API.LOG_IN, { email, password });
};
