import { Band } from "./Band";
import { Capability } from "./Capability";

export type JobRoleResponse = {
    jobRoleId: number,
    roleName: string,
    location: string,
    closingDate: Date,
    band: Band,
    capability: Capability
};
