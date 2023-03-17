import { AccessControl } from "accesscontrol";
import { STUDENT, TEACHER } from "../constants/roleConstants";

const ac = new AccessControl();

ac.grant(STUDENT)
    .readAny("book")
    .readAny("category")
    .create("booking")
    .delete("booking")
    .read("booking")


ac.grant(TEACHER)
    .readAny("book")
    .readAny("category")
    .create("book")
    .create("category")
    .create("booking")
    .delete("book")
    .delete("category")
    .delete("booking")
    .read("booking")

    ac.grant(TEACHER)
    .readAny("book")
    .readAny("category")
    .create("book")
    .create("category")
    .create("booking")
    .delete("book")
    .delete("category")
    .delete("booking")
    .read("booking")