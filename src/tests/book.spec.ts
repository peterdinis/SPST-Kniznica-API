import { app } from "../server";
import chai, {expect} from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("Get all books", () => {
    it("GET /books", (done) => {
        chai.request(app)
        .get("/books")
        .end((err, response) => {
            expect(response).to.have.status(200);
            expect(response).to.have.property("body")
            done();
        })
    })
})

describe("Get book info", () => {
    it("GET /book/:id", (done) => {
        chai.request(app)
        .get("/books/1")
        .end((err, response) => {
            expect(response).to.have.status(200);
            expect(response).to.have.property("body")
            done();
        })

    })
})