import "mocha";
import request from "supertest"
import { app } from "../server";
import chai, { expect } from "chai";

chai.use(require('chai-like'));
chai.use(require('chai-things'));

describe("Test GET /books", () => {
    it("Display all books", async() => {
        const allBooksRequest = await request(app).get("/books")
        const allBooksResponse = allBooksRequest.body;
        expect(allBooksRequest.status).to.eq(200);
        expect(allBooksResponse).to.be.an("array");
    })
})