import request from "supertest";
import {app} from "../server";

describe("Testing example endpoint", () => {
    test("Try to get data from our example endpoint", async() => {
        const exampleRequest = await request(app).get("/example");
        const exampleResponse = exampleRequest.body;
        expect(exampleResponse).toEqual("OK");
    })
})