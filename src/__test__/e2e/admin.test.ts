import { app } from "../../server";
import request from "supertest";

describe("Testing Example endpoint", () => {
    it("Test Example Endpoint", async () => {
        const exampleAdminRequest = await request(app).get("/admin/example");
        const exampleAdminResponse = exampleAdminRequest.body;
        const expectedResponse: Record<string, never> = {};
        expect(exampleAdminResponse).toEqual(expectedResponse);
    })
})