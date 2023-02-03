import * as jwt from "jsonwebtoken"
import { IUser } from "../interfaces/IUser";

function generateAccessToken(user: IUser) {
    return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: '5m',
    });
  }
  