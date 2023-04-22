import { Socket } from "socket.io";
import { IUser } from "./interfaces/IUser";

let users: Array<IUser>;
let helperId = Math.random().toString();

export const SocketServer = (socket: Socket) => {
  socket.on("connection", (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("joinUser", (user: IUser) => {
      users.push({
        id: helperId,
        name: user.name,
        email: user.email,
        socketId: helperId,
      });
    });

    socket.on("createNotify", (msg) => {
      const client = users.find((user) => msg.recipients.includes(user.id));
      client && socket.to(`${client.socketId}`).emit("createNotify", msg);
    });

    socket.on("removeNotify", (msg) => {
      const client = users.find((user) => msg.recipients.includes(user.id));
      client && socket.to(`${client.socketId}`).emit("removeNotify", msg);
    });

    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
      users = users.filter((user) => user.socketId !== socket.id);
    });
  });
};
