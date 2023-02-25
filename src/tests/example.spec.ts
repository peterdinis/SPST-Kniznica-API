import { app } from "../server";
import chai from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("Testing example endpoint", () => {
    it("GET /example", (done) => {
        chai.request(app)
          .get("/example")
          .end((err, response) => {
             response.should.have.status(200);
             response.body.should.be.a("object");
            done();
          });
    });
})