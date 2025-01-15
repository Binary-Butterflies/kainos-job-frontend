import { AxiosResponse } from "axios";
import { axiosInstance } from "./AxiosService";
import { LoginRequest } from "../models/LoginRequest";
import { RegisterRequest } from "../models/RegisterRequest";
import { getLogger } from "../LogConfig";

const logService = getLogger("service");
export const URL: string = "api/auth/"

export const getToken = async function (
  loginRequest: LoginRequest
): Promise<string> {
  try {
    logService.info(() => "Get Token");
    const response: AxiosResponse = await axiosInstance.post(
      URL+"login",
      loginRequest
    );

    return response.data;
  } catch (e) {
    logService.error(() => e);
    throw e;
  }
};

export const createUser = async function (
  registerRequest: RegisterRequest
): Promise<number> {
  try {
    logService.info(() => "Create User");
    const response: AxiosResponse = await axiosInstance.post(
      URL+"register",
      registerRequest
    );

    return response.data;
  } catch (e) {
    logService.error(() => e);
    throw e;
  }
};
