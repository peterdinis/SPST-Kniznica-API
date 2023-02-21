import * as jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { getErrorMessage } from "../helpers/catchErrorMessage";

function isLogged(req: any, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401);
    throw new Error("🚫 Un-Authorized 🚫");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    req.payload = payload;
  } catch (err: any) {
    res.status(401);
    if (err.name === "TokenExpiredError") {
      getErrorMessage(err);
    }
    throw new Error("🚫 Un-Authorized 🚫");
  }

  return next();
}

export default isLogged;
