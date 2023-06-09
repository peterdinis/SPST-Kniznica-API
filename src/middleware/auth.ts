import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import { getErrorMessage } from "../helpers/catchErrorMessage";

interface CustomRequest extends Request {
  user?: unknown;
}

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    req.user = verified;
    next();
  } catch (err: unknown) {
    getErrorMessage(err);
  }
};