import "mocha";
import request from "supertest"
import { app } from "../server";

describe("Test example endpoint", () => {
    it("Get return value from our example endpoint", async() => {
        const exampleRequest = await request(app).get("/example");
        const exampleResponse = exampleRequest.body;
        console.log(exampleResponse);
    })
})