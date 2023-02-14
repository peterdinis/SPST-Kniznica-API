import "mocha";
import request from "supertest"
import { app } from "../server";
import { expect } from "chai";

describe("Test example endpoint", () => {
    it("Get return value from our example endpoint", async() => {
        const exampleRequest = await request(app).get("/example");
        const exampleResponse = exampleRequest.text;
        
        expect(exampleRequest.status).to.equal(200);
        expect(exampleResponse).to.equal("OK");
    })
})