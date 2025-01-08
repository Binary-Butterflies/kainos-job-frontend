import axios, {AxiosResponse} from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { RegisterRequest } from "../models/RegisterRequest";

export const getToken = async function(loginRequest:LoginRequest): Promise<string> {
    console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'getToken'));
    try {
        console.log("Get Token")
        const response:AxiosResponse = await axios.post("http://localhost:8080/api/auth/login" ,loginRequest);
        return response.data;
    }catch(e){
        console.error(e);
        throw new Error("Failed to get employee");
    }
}

export const createUser = async function (registerRequest : RegisterRequest ):Promise<number> {
    try{
        console.log("Create User")
        const response: AxiosResponse = await axios.post("http://localhost:8080/api/auth/register", registerRequest);
        return response.data;
    } catch(e){
        console.error(e);
        throw new Error("Failed to create employee");
    }
}