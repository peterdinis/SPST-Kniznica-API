import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

export const verifyToken = async (
  req: any,
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
      process.env.JWT_SECRET as unknown as string
    );
    req.user = verified;
    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
