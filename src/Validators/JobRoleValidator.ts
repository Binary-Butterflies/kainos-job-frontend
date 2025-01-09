import { JobRoleRequest } from "../models/JobRoleRequest";

export const validateJobRoleRequest = function (jobRoleRequest: JobRoleRequest): void {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const closingDate = new Date(jobRoleRequest.closingDate);

  if (closingDate < currentDate) {
    throw new Error("Closing date cannot be in the past");
  }

  if (jobRoleRequest.bandId < 0) {
    throw new Error("bandId must not be negative");
  }

  if (!jobRoleRequest.roleName || jobRoleRequest.roleName.trim() === "") {
    throw new Error("roleName must not be empty");
  }

  if (!jobRoleRequest.location) {
    throw new Error("location must not be undefined");
  }
};
