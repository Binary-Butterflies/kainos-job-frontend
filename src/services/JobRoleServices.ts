import { AxiosResponse } from "axios";
import { axiosInstance } from "./AxiosService";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { getLogger } from "../LogConfig";
import { getHeader } from "../utils/AuthUtil";
import { JobRoleDetailedResponse } from "../models/JobRoleDetailedResponse";

const logService = getLogger("service");
export const URL: string = "job-roles/";

export const getAllJobRoles = async (token: string): Promise<JobRoleResponse[]> => {
    try {
        logService.info(() => "getAllJobRoles")
        const response: AxiosResponse = await axiosInstance.get(URL, getHeader(token));
        
        return response.data;
    } catch (e) {
        logService.error(() => e.message)
        throw new Error("Could not get job roles");
    }
}

export const getSingleJobRole = async function (id: string, token: string): Promise<JobRoleDetailedResponse> {
    try {
        logService.info(() => "getSingleJobRole/" + id)
        const response: AxiosResponse = await axiosInstance.get(URL + id, getHeader(token));

        return response.data;
    } catch (e) {
        if (e?.response?.status === undefined) {
            throw new Error(e.message);
        }

        switch (e.response.status) {
            case 400:
                throw new Error('Job Role does not exist');
            case 500:
                throw new Error('Failed to get Job Role');
            default:
                throw new Error(e.message);
        }
    }
}





