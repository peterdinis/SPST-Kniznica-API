import { app } from "../../server";
import request from "supertest";

describe("Testing Books Endpoints", () => {
    it("Get All Books", async () => {
        const allBooksRequest = await request(app).get("/books");
        const allBooksResponse = allBooksRequest.body;
        console.log(allBooksResponse)
    });

    it.only("Find one book by id", async () => {
        const allBooksRequest = await request(app).get("/books");
        const allBooksResponse = allBooksRequest.body;
        console.log(allBooksResponse);

        const testBookId = allBooksResponse[0].externalId;

        const findOneBookRequest = await request(app).get(`/book/${testBookId}`);
        const findOneBookResponse = findOneBookRequest.body;
        console.log(findOneBookResponse);
    })
})