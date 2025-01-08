import axios, { AxiosResponse } from "axios";
import { JobRoleRequest } from "../models/JobRoleRequest";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { validateJobRoleRequest } from "../Validators/JobRoleValidator";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

export const URL: string = "/job-roles/";

export const createJobRole = async function (jobRole: JobRoleRequest): Promise<number> {
    try { 
        console.log("createJobRole")
        validateJobRoleRequest(jobRole);

        const response: AxiosResponse = await axios.post(URL, jobRole);

        return response.data;
    } catch (e) { 
        console.error(e.message)
        throw new Error(e.message);
    }    
}

export const getSingleJobRole = async function (id: string): Promise<JobRoleResponse> {
    try {
        console.log("getSingleJobRole")
        const response: AxiosResponse = await axios.get(`${URL}${id}`);

        return response.data;
    } catch (e) {
        console.error(e.message)
        throw new Error(`Could not get job role with ID: ${id}`);
    }
}

export const getAllJobRoles = async function (): Promise<JobRoleResponse[]> {
    try {
        console.log("getAllJobRoles")
        const response: AxiosResponse = await axios.get(URL);

        return response.data;
    } catch (e) {
        console.error(e.message)
        throw new Error("Could not get job roles");
    }
}
