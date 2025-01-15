import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";
import { getAllJobRoles, getSingleJobRole, URL } from "../../../src/services/JobRoleServices";

const mock = new MockAdapter(axios);

describe("JobRoleService", function () {

  describe("getAllJobRoles", function () {

    it("should throw exception when 500 error returned from axios", async () => {
      mock.onGet(URL).reply(500);

      getAllJobRoles(null).catch((e) => {
        expect(e.message).to.equal("Could not get job roles");
      }).then(() => {
        throw new Error("Test failed - exception was not thrown");
      });
    });
  });

  describe("getSingleJobRole", function () {

    it("should throw exception when 500 error returned from axios", async () => {
      mock.onGet(URL).reply(500);

      getSingleJobRole("2").catch((e) => {
        expect(e.message).to.equal("Could not get job roles");
      }).then(() => {
        throw new Error("Test failed - exception was not thrown");
      });
    });
  });

});
