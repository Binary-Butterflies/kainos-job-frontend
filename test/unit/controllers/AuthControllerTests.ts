import * as AuthController from "../../../src/controllers/AuthController";
import * as AuthServices from "../../../src/services/AuthServices";
import { afterEach, describe } from "node:test";
import sinon from "sinon";
import { expect } from "chai";
import { Request, Response } from "express";

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}
describe("AuthController", function () {
  afterEach(() => {
    sinon.restore();
  });
  describe("LoginForm", function () {
    it("should render login form", async () => {
      const res = { render: sinon.spy() };
      const req = {};
      await AuthController.getLoginForm(
        req as Request,
        res as unknown as Response
      );
      expect(res.render.calledOnce).to.be.true;
    });

    it("should render login form with error message when error thrown", async () => {
      sinon.restore();
      const errorMessage: string = "Failed to login";
      sinon.stub(AuthServices, "getToken").rejects(new Error(errorMessage));
      const req = {};
      const res = {
        render: sinon.spy(),
        locals: { errorMessage: "Failed to login" },
      };

      await AuthController.postLoginForm(
        req as Request,
        res as unknown as Response
      );

      expect(res.render.calledOnce).to.be.true;
      expect(res.locals.errorMessage).to.equal(errorMessage);
    });
  });

  describe("RegisterForm", function () {
    it("should render Registration form", async () => {
      const res = { render: sinon.spy() };
      const req = {};
      await AuthController.getRegistrationForm(
        req as Request,
        res as unknown as Response
      );
      expect(res.render.calledOnce).to.be.true;
    });

    it("should render register form with error message when error thrown", async () => {
      sinon.restore();
      const errorMessage: string = "Failed to register";
      sinon.stub(AuthServices, "createUser").rejects(new Error(errorMessage));
      const req = {};
      const res = {
        render: sinon.spy(),
        locals: { errorMessage: "Failed to register" },
      };

      await AuthController.postRegistrationForm(
        req as Request,
        res as unknown as Response
      );

      expect(res.render.calledOnce).to.be.true;
      expect(res.locals.errorMessage).to.equal(errorMessage);
    });
  });
});
