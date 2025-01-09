import axios, { AxiosResponse } from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { RegisterRequest } from "../models/RegisterRequest";
import { getLogger } from "../LogConfig";

const logService = getLogger("service")

export const getToken = async function (
  loginRequest: LoginRequest
): Promise<string> {
  try {
    logService.info("Get Token");
    const response: AxiosResponse = await axios.post(
      "http://localhost:8080/api/auth/login",
      loginRequest
    );
    return response.data;
  } catch (e) {
    logService.error(e);
    throw new Error("Failed to get employee");
  }
};

export const createUser = async function (
  registerRequest: RegisterRequest
): Promise<number> {
  try {
    logService.info("Create User");
    const response: AxiosResponse = await axios.post(
      "http://localhost:8080/api/auth/register",
      registerRequest
    );
    return response.data;
  } catch (e) {
    logService.error(e);
    throw new Error("Failed to create employee");
  }
};
