import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { LoginRequest } from "../../../src/models/LoginRequest";
import sinon from "sinon";
import { createUser, getToken } from "../../../src/services/AuthServices";
import { expect } from "chai";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { RegisterRequest } from "../../../src/models/RegisterRequest";

chai.use(chaiAsPromised);

const URL = axios.defaults.baseURL + "api/auth/"
const mock = new MockAdapter(axios);
const loginRequest: LoginRequest = {
  email: "Terry@gmail.com",
  password: "Terry",
};
 
const badRegisterRequest: RegisterRequest = {
  email: "Terrymail.com",
  password: "Terry"
};

const token = "MyMockToken";

describe("AuthService", function () {
  afterEach(() => {
    sinon.restore();
  });
  
  describe("login", function () {
    it("should return token", async () => {
      mock.onPost(URL+"login", loginRequest).reply(200, token);
      const results = await getToken(loginRequest);

      expect(results).to.deep.equal(token);
    });

    it("should throw exception when 500 returned by axios", async () => {
      mock.onPost(URL+"login", ).reply(500);

      await getToken(loginRequest).catch((e) => {
        expect(e.message).to.equal("Failed to get job role");
      });
    });
  });
  describe("register", function () {
    it("should throw exception when 500 returned by axios", async () => {
      mock.onPost(URL+"register", badRegisterRequest).reply(500);
      await createUser(badRegisterRequest).catch((e) => {
        expect(e.message).to.equal("Failed to create job role");
      });
    });
  });
});