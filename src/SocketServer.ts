import { Socket } from "socket.io";

let users = [] as any[]; 

console.log(users);

const SocketServer = (socket: Socket) => {
    socket.on("connection", (user: any) => {
        console.log("user was connected");
        users.push({id: user.id, socketId: socket.id});
        console.log(users);
    });

    socket.on("disconnect", () =>{
        console.log("user was disconnected");
        users = users.filter((user: { socketId: string; }) => user.socketId !== socket.id)
        console.log(users);
    })

    // Notification
    socket.on('createNotify', msg => {
        const client = users.find(user => msg.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
    })

    socket.on('removeNotify', msg => {
        const client = users.find(user => msg.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)

    })

}

export default SocketServer;