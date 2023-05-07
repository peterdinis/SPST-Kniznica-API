import { app } from "../server";
import request from "supertest";

describe("Testing Books Endpoints", () => {
    it("Get All Books", async () => {
        const allBooksRequest = await request(app).get("/books");
        const allBooksResponse = allBooksRequest.body;
        console.log(allBooksResponse)
    })
})