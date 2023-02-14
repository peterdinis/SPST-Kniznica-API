import { Socket } from "socket.io";
import { IUser } from "./interfaces/IUser";
import { IMessage } from "./interfaces/IMessage";

let users: Array<[]> = [];

export const SocketServer = (socket: Socket) => {
    
    socket.on("registerUser", (user: IUser) => {

    });

    socket.on("disconnect", () => {

    });

    socket.on("writeMessage", (data: IMessage) => {

    });

    
}