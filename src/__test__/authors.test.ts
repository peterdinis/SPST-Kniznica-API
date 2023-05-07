import { app } from "../server";
import request from "supertest";

describe("Testing Authors Endpoints", () => {
    it.only("Get All Authors", async () => {
        const allAuthorsRequest = await request(app).get("/authors");
        const allAuthorsResponse = allAuthorsRequest.body;
        const expectedResponse = [
            {
                id: expect.any(Number),
                externalId: expect.any(Number),
                name: expect.any(String),
                lastName: expect.any(String),
                picture: null,
                birthYear: expect.any(Number),
                deathYear: null,
                country: expect.any(String),
                description: expect.any(String),
                litPeriod: expect.any(String),
            }
        ] 
    })
})