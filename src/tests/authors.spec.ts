import { app } from "../server";
import chai, {expect} from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);