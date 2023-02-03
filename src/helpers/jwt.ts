import * as jwt from "jsonwebtoken";
import { IUser } from "../interfaces/IUser";

export function generateAccessToken(user: IUser) {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "5m",
    }
  );
}

export function generateRefreshToken(user: IUser, tokId: number) {
  return jwt.sign(
    {
      userId: user.id,
      tokId,
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "4h",
    }
  );
}


export function generateTokens(user: any, tokId: number) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, tokId);
  
    return {
      accessToken,
      refreshToken,
    };
}