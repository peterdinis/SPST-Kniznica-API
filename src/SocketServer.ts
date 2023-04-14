import { Socket } from "socket.io";

type IUser = {
  socketId: string;
  name: string;
  email: string;
};

let users: Array<IUser>;
let socketId = Math.random().toString();

export const SocketServer = (socket: Socket) => {
  socket.on("connection", (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("joinUser", (user: IUser) => {
      users.push({
        name: user.name,
        email: user.email,
        socketId,
      });
    });

    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
      users = users.filter((user) => user.socketId !== socket.id);
    });
  });
};
