import { LoginFormType, RegisterFormType } from "../types/type"
import { authRequest } from "./request";


export const requestLogin = async (loginForm: LoginFormType) => {
  return await authRequest.post("/login", loginForm, { withCredentials: true });
};

export const requestRegister = async (registerForm: RegisterFormType) => {
  return await authRequest.post("/user", registerForm);
};
