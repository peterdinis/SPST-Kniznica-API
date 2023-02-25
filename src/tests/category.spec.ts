import { app } from "../server";
import chai, {expect} from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("Get all categories", () => {
    it("GET /categories", (done) => {
        chai.request(app)
        .get("/categories")
        .end((err, response) => {
            expect(response).to.have.status(200);
            expect(response).to.have.property("body")
            done();
        })
    })
})