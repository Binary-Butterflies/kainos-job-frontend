import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { LoginRequest } from "../../../src/models/LoginRequest";
import sinon from "sinon";
import { getToken } from "../../../src/services/AuthServices";
import { expect } from "chai"
const URL = "http://localhost:8080/api/auth/login";
const mock = new MockAdapter(axios);
const loginRequest: LoginRequest = {
  email: "Terry@gmail.com",
  password: "Terry",
};
const badLoginRequest: LoginRequest = {
  email: "T@gmail.com",
  password: "Terry",
};

const token = "MyMockToken";

describe("AuthService", function () {
  afterEach(() => {
    sinon.restore();
  });
  describe("login", function () {
    it("should return token", async () => {
      mock
        .onPost(URL, loginRequest)
        .reply(200, token);
      const results = await getToken(loginRequest);

      expect(results).to.deep.equal(token);
    });

    it("should throw exception when 500 returned by axios", async () => {
      mock
        .onPost(URL, badLoginRequest)
        .reply(500);
      try {
        await getToken(badLoginRequest);
      } catch (e) {
        expect(e.message).to.equal("Failed to get employee");
        return;
      }
    });
  });
  describe("register", function () {
    it("should throw exception when 500 returned by axios", async () => {
      mock
        .onPost(URL, badLoginRequest)
        .reply(500);
      const message = await getToken(loginRequest);
      expect(message).to.equal("Failed to create employee");
    });
  });
});
