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
  closingDate: new Date("2025-12-31"),
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

    it("should render view with error message when error is thrown", async () => {
      const errorMessage = "Error message";
      
      sinon.stub(JobRoleService, "getAllJobRoles").rejects(new Error(errorMessage));

      const req = {};
      const res = { render: sinon.spy(), locals: { errormessage: errorMessage} };

      await JobRoleController.getJobRoles(req as Request, res as unknown as Response);

      expect(res.render.calledOnce).to.be.true;
      expect(res.locals.errormessage).to.equal(errorMessage);
    });
  });

  describe("getJobRole", function () {
    it("should render view with job role when job role is returned", async () => {
      const jobRoleId = 123;

      sinon.stub(JobRoleService, "getSingleJobRole").resolves(jobRoleResponse);

      const req = { params: { id: jobRoleId } };
      const res = { render: sinon.spy() };

      await JobRoleController.getJobRole(req as unknown as Request, res as unknown as Response);
      expect(res.render.calledOnce).to.be.true;
    });

    it("should render error view with error message when error is thrown", async () => {
      const jobRoleId = 123;
      const errorMessage = "Error retrieving job role";

      sinon.stub(JobRoleService, "getSingleJobRole").rejects(new Error(errorMessage));

      const req = { params: { id: jobRoleId } };
      const res = { render: sinon.spy(), locals: { errormessage: "" } };

      await JobRoleController.getJobRole(req as unknown as Request, res as unknown as Response);

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

  describe("getJobRoleForm", function () {
    it("should render job role form view", async () => {
      const req = {};
      const res = { render: sinon.spy() };

      await JobRoleController.getJobRoleForm(req as Request, res as unknown as Response);

      expect(res.render.calledOnce).to.be.true;
    });
  });
});
