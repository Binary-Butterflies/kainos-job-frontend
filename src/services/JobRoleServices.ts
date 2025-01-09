import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import {getLogger} from "../LogConfig";

const logService = getLogger("service");

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

export const URL: string = "/job-roles/";

export const getAllJobRoles = async function (): Promise<JobRoleResponse[]> {
    try {
        logService.info(() => "getAllJobRoles")
        const response: AxiosResponse = await axios.get(URL);

        return response.data;
    } catch (e) {
        logService.error(() => e.message)
        throw new Error("Could not get job roles");
    }
}



