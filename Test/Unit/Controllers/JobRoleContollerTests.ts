import { Request, Response } from 'express';
import * as JobRoleController from "../../../src/controllers/JobRoleController";
import * as JobRoleService from "../../../src/services/JobRoleServices";
import { expect } from "chai";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { JobRoleDetailedResponse } from '../../../src/models/JobRoleDetailedResponse';
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
  },
}

const jobRoleDetailedResponse: JobRoleDetailedResponse = {
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
  },
  details: {
    description: "Develop and maintain software applications.",
    responsibilities: "Write clean, scalable code.",
    sharepointURL: "test",
    statusId:  1,
    statusName: "test",
    numberOfOpenPositions: 3
  }
}

describe("JobRoleController", function () {
  afterEach(() => {
    sinon.restore();
  });

  describe("getJobRoles", function () {
    it("should render view with job roles when job roles are returned", async () => {
      const jobRoleList = [jobRoleResponse];

      sinon.stub(JobRoleService, "getAllJobRoles").resolves(jobRoleList);

      const req = {};
      const res = { render: sinon.spy(), locals: { errormessage: "" } };

      await JobRoleController.getJobRoles(req as Request, res as unknown as Response);

      expect(res.render.calledOnce).to.be.true;
    });

    it("should render view with job roles when empty job role list is returned", async () => {
      const jobRoleList: JobRoleResponse[] = [];

      sinon.stub(JobRoleService, "getAllJobRoles").resolves(jobRoleList);

      const req = {};
      const res = { render: sinon.spy(), locals: { errormessage: "" } };

      await JobRoleController.getJobRoles(req as Request, res as unknown as Response);

      expect(res.render.calledOnce).to.be.true;
    });

    it("should render view with error message when error is thrown", async () => {
      const errorMessage = "Error message";

      sinon.stub(JobRoleService, "getAllJobRoles").rejects(new Error(errorMessage));

      const req = { session: { token: 'test' } };
      const res = { render: sinon.spy(), locals: { errormessage: errorMessage } };

      await JobRoleController.getJobRoles(req as unknown as Request, res as unknown as Response);

      expect(res.render.calledOnce).to.be.true;
      expect(res.locals.errormessage).to.equal(errorMessage);
    });
  });

  describe("getJobRole", function () {
    it("should render view with job role when job role are returned", async () => {
      const jobRole = jobRoleDetailedResponse;

      sinon.stub(JobRoleService, "getSingleJobRole").resolves(jobRole);

      const req = { params: { id: "1" } };
      const res = { render: sinon.spy(), locals: { errormessage: "" } };

      await JobRoleController.getJobRole(req as unknown as Request, res as unknown as Response);

      expect(res.render.calledOnce).to.be.true;
    });
  });
    

  describe("getIndex", function () {
    it("should render job role home view", async () => {
      const req = {};
      const res = { render: sinon.spy(), locals: { errormessage: "" } };

      await JobRoleController.getIndex(req as Request, res as unknown as Response);

      expect(res.render.calledOnce).to.be.true;
    });
  });
});