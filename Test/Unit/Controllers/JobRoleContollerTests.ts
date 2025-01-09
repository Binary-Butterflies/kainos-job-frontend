import { Request, Response } from 'express';
import * as JobRoleController from "../../../src/controllers/JobRoleController";
import * as JobRoleService from "../../../src/services/JobRoleServices";
import { expect } from "chai";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import sinon from "sinon";

const jobRoleResponse: JobRoleResponse = {
  jobRoleId: 123,
  roleName: "Software Engineer",
  location: "Bristol",
  closingDate: new Date("31-12-2025"),
  band: {
    bandId: 1,
    bandName: "Senior"
  },
  capability: {
    capabilityId: 101,
    capabilityName: "Software Development"
  }
};

describe("JobRoleController", function () {
  afterEach(() => {
    sinon.restore();
  });

  describe("getJobRoles", function () {
    it("should render view with job roles when job roles are returned", async () => {
      const jobRoleList = [jobRoleResponse];

      sinon.stub(JobRoleService, "getAllJobRoles").resolves(jobRoleList);

      const req = {};
      const res = { render: sinon.spy() };

      await JobRoleController.getJobRoles(req as Request, res as unknown as Response);

      expect(res.render.calledOnce).to.be.true;
    });

    it("should render view with job roles when empty job role list is returned", async () => {
      const jobRoleList: JobRoleResponse[] = [];

      sinon.stub(JobRoleService, "getAllJobRoles").resolves(jobRoleList);

      const req = {};
      const res = { render: sinon.spy() };

      await JobRoleController.getJobRoles(req as Request, res as unknown as Response);

      expect(res.render.calledOnce).to.be.true;
    });

    it("should render view with error message when error is thrown", async () => {
      const errorMessage = "Error message";

      sinon.stub(JobRoleService, "getAllJobRoles").rejects(new Error(errorMessage));

      const req = {};
      const res = { render: sinon.spy(), locals: { errormessage: errorMessage } };

      await JobRoleController.getJobRoles(req as Request, res as unknown as Response);

      expect(res.render.calledOnce).to.be.true;
      expect(res.locals.errormessage).to.equal(errorMessage);
    });
  });

  describe("getIndex", function () {
    it("should render job role home view", async () => {
      const req = {};
      const res = { render: sinon.spy() };

      await JobRoleController.getIndex(req as Request, res as unknown as Response);

      expect(res.render.calledOnce).to.be.true;
    });
  });
});
