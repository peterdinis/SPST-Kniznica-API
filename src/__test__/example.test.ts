import { app } from "../server";
import request from "supertest";

describe("Testing example endpoint", () => {
  it("Testing example endpoint", async () => {
    const exampleRequest = await request(app).get("/example").expect(200);

    const exampleResponse = exampleRequest.body;
    expect(exampleResponse).toBe("OK");
  });
});
