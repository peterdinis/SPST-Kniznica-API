import { app } from "../server";
import request from "supertest";
import { IAuthor } from "./interfaces/IAuthor";

describe("Testing Authors Endpoints", () => {
    it("Get All Authors", async () => {
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
        ] as IAuthor[];

        expect(allAuthorsResponse).toEqual(expectedResponse);
    })
})