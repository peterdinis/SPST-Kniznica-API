import { Response } from "express";

function sendRefreshToken(res: Response, token: string) {
    res.cookie('refresh_token', token, {
        httpOnly: true,
        sameSite: true,
        path: '/student/refreshToken', // TODO: Update path later
      });
}

export default sendRefreshToken