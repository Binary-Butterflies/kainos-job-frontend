import { Band } from "./Band";
import { Capability } from "./Capability";
import { JobRoleDetails } from "./JobRoleDetails";

export type JobRoleDetailedResponse = {
    jobRoleId: number,
    roleName: string,
    location: string,
    closingDate: Date,
    band: Band,
    capability: Capability,
    details: JobRoleDetails
};
