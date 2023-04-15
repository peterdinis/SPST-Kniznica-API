import { Socket } from "socket.io";

type IUser = {
  id: string;
  socketId: string;
  name: string;
  email: string;
};

let users: Array<IUser>;
let id = Math.random.toString();
let socketId = Math.random().toString();

export const SocketServer = (socket: Socket) => {
  socket.on("connection", (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("joinUser", (user: IUser) => {
      users.push({
        id,
        name: user.name,
        email: user.email,
        socketId,
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
