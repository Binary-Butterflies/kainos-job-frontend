import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";
import { getAllJobRoles,URL } from "../../../src/services/JobRoleServices";

const mock = new MockAdapter(axios);

describe("JobRoleService", function () {

  describe("getAllJobRoles", function () {

    it("should throw exception when 500 error returned from axios", async () => {
      mock.onGet(URL).reply(500);

      try {
        await getAllJobRoles();
      } catch (e) {
        expect(e.message).to.equal("Could not get job roles");
        return;
      }

      throw new Error("Test failed - exception was not thrown");
    });
  });
});
