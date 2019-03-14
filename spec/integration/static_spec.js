const request = require("request"); //import request module which we will use to make requests to server during our tests
const server = require("../../src/server"); //require server
const base = "http://localhost:3000/"; //define base URL that we use for our requests

//write test for root path
describe("routes : static", () => {
  //#1
  describe("GET /", () => {
    //#2 test when requesting server using that route we get...
    it("should return status code 200", done => {
      //#3 use request to send a GET request to the base URL. Set expectation that the statusCode property of the response should be 200
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

        //#4 call done method to let Jasmine know our test is completed.
        done();
      });
    });
  });
});
