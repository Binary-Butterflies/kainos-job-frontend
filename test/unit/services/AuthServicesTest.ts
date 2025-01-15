import { axiosInstance } from "../../../src/services/AxiosService";
import MockAdapter from "axios-mock-adapter";
import { LoginRequest } from "../../../src/models/LoginRequest";
import sinon from "sinon";
import { URL, createUser, getToken } from "../../../src/services/AuthServices";
import { expect } from "chai";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { RegisterRequest } from "../../../src/models/RegisterRequest";

chai.use(chaiAsPromised);

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
  let mock: MockAdapter;
  this.beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
  })

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
      mock.onPost(URL+"login", loginRequest).reply(500);

      await getToken(loginRequest).catch((e) => {
        expect(e.message).to.equal("Failed to login");
      });
    });
  });
  describe("register", function () {
    it("should throw exception when 500 returned by axios", async () => {
      mock.onPost(URL+"register", badRegisterRequest).reply(500);
      await createUser(badRegisterRequest).catch((e) => {
        expect(e.message).to.equal("Failed to create user");
      });
    });
  });
});