import { app } from "../server";
import request from "supertest";

describe("Testing Example endpoint", () => {
    it("Test Example Endpoint", async () => {
        const exampleRequest = await request(app).get("/example");
        const exampleResponse = exampleRequest.body;
        const expectedResponse: Record<string, never> = {};
        expect(exampleResponse).toEqual(expectedResponse);
    })
})