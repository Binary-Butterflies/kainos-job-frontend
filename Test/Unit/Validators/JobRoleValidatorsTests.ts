import { describe, it } from 'node:test';
import { validateJobRoleRequest } from '../../../src/Validators/JobRoleValidator';
import { JobRoleRequest } from '../../../src/models/JobRoleRequest';
import assert from 'assert';

describe('JobRoleValidator', function () {
  describe('validateJobRoleRequest', function () {

    it('should not throw an exception for a valid JobRoleRequest', () => {
      const jobRoleRequest: JobRoleRequest = {
        roleName: "Software Engineer",
        location: "Bristol",
        closingDate: new Date('31-12-2025'),
        bandId: 1
      };

      validateJobRoleRequest(jobRoleRequest);
    });

    it('should throw an error if roleName is empty', () => {
      const jobRoleRequest: JobRoleRequest = {
        roleName: "",
        location: "Bristol",
        closingDate: new Date('31-12-2025'),
        bandId: 1
      };

      assert.throws(
        () => validateJobRoleRequest(jobRoleRequest),
        new Error("roleName must not be empty")
      );
    });

    it('should throw an error if closingDate is in the past', () => {
      const jobRoleRequest: JobRoleRequest = {
        roleName: "Software Engineer",
        location: "Bristol",
        closingDate: new Date('01-01-2020'),
        bandId: 1
      };

      assert.throws(
        () => validateJobRoleRequest(jobRoleRequest),
        new Error("Closing date cannot be in the past")
      );
    });

    it('should throw an error if location is undefined', () => {
      const jobRoleRequest: JobRoleRequest = {
        roleName: "Software Engineer",
        location: undefined,
        closingDate: new Date('31-12-2025'),
        bandId: 1
      };

      assert.throws(
        () => validateJobRoleRequest(jobRoleRequest),
        new Error("location must not be undefined")
      );
    });

    it('should throw an error if bandId is negative', () => {
      const jobRoleRequest: JobRoleRequest = {
        roleName: "Software Engineer",
        location: "Bristol",
        closingDate: new Date('31-12-2025'),
        bandId: -1
      };

      assert.throws(
        () => validateJobRoleRequest(jobRoleRequest),
        new Error("bandId must not be negative")
      );
    });
  });
});
