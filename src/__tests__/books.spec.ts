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

describe("Test GET /books/:id", () => {

    it.skip("Trying to find one book be id", async() => {
        return;
    })

    it.skip("Trying to find book but id does not exists", async() => {
        const testId = 3030;

        const allBooksRequest = await request(app).get(`/book/${testId}`)
        expect(allBooksRequest.status).to.equal(404);
    })

    it.only("Trying to find book by id but requested id is not nmber", async() => {
        const testId = "EOEOEOEOE"

        const allBooksRequest = await request(app).get(`/book/${testId}`)
        expect(allBooksRequest.status).to.equal(404);
    })
})