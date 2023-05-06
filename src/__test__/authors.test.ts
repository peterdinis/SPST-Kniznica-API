import { app } from "../server";
import request from "supertest";

describe("Testing Authors Endpoints", () => {
    it.only("Get All Authors", async () => {
        const allAuthorsRequest = await request(app).get("/authors");
        const allAuthorsResponse = allAuthorsRequest.body;
        console.log(allAuthorsResponse);
    })
})