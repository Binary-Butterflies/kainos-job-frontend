import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";
import { URL, getAllJobRoles, getSingleJobRole } from "../../../src/services/JobRoleServices";
import { axiosInstance } from "../../../src/services/AxiosService";

describe("JobRoleService", function () {
  let mock: MockAdapter;
  this.beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
  })

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
