import "mocha";
import request from "supertest"
import { app } from "../server";
import { expect } from "chai";

describe("Test GET /books", () => {
    it("Display all books", async() => {
        const allBooksRequest = await request(app).get("/books")
        const allBooksResponse = allBooksRequest.body;
        console.log(allBooksResponse.length)
    })
})

describe("Test GET /books/:id", () => {
    it("Trying to find book but id does not exists", async() => {
        const testId = 3030;

        const allBooksRequest = await request(app).get(`/book/${testId}`)
        expect(allBooksRequest.status).to.equal(404);
    })
})