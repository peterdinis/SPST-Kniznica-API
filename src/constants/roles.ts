import { AccessControl } from "accesscontrol";
import { ADMIN, STUDENT, TEACHER } from "./roleConstants";

const ac = new AccessControl();

ac.grant(STUDENT)
  .readAny("book")
  .readAny("category")
  .create("booking")
  .delete("booking")
  .read("booking");

ac.grant(TEACHER)
  .readAny("book")
  .readAny("category")
  .create("book")
  .create("category")
  .create("booking")
  .delete("book")
  .delete("category")
  .delete("booking")
  .read("booking");

ac.grant(ADMIN)
  .readAny("book")
  .readAny("category")
  .readAny("booking")
  .create("book")
  .create("category")
  .create("booking")
  .delete("book")
  .delete("category")
  .delete("booking");
