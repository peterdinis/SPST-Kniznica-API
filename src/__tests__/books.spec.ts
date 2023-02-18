import "mocha";
import request from "supertest";
import { app } from "../server";
import chai, { expect, should } from "chai";

chai.use(require("chai-like"));
chai.use(require("chai-things"));

describe("Test GET /books", () => {
  it("Display all books", async (done) => {
    const allBooksRequest = await request(app)
      .get("/books")
      .end((res, err) => {
        if(err) throw err;
        res.should.have.status(200);
        done();
      });
  });
});
