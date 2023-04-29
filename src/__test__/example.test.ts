import { app } from "../server";
import request from "supertest";

describe("Testing example endpoint", () => {
  it("Testing example endpoint", async () => {
    const exampleRequest = await request(app).get("/example").expect(200);
    const exampleBody = exampleRequest.body;
    expect(exampleBody).toEqual({});
  });
});
