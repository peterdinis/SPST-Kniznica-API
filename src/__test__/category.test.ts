import { app } from "../server";
import request from "supertest";

describe("Testing Categories Endpoints", () => {
    it.only("Get All Categories", async () => {
        const allCategoriesRequest = await request(app).get("/categories");
        const allCategoriesResponse = allCategoriesRequest.body;
        console.log(allCategoriesResponse);
    })
})