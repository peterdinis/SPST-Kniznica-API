import { Socket } from "socket.io";

export const SocketServer = (socket: Socket) => {
  socket.on("connection", (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    //Listens and logs the message to the console
    socket.on("returnStudentBook", (data: any) => {
        socket.emit("returnStudentMessage", data)
    });

    socket.on("returnTeacherBook", (data: any) => {
        socket.emit("returnTeacherMessage", data);
    });

    socket.on("updateBook", (data: any) => {
        socket.emit("updateBookMessage", data);
    });

    socket.on("deleteBook", (data: any) => {
        socket.emit("deleteBookMessage", data);
    });

    socket.on("deleteCategory", (data: any) => {
        socket.emit("deleteCategoryMessage", data);
    });

    socket.on("updateCategory", (data: any) => {
        socket.emit("updateCategoryMessage", data)
    })

    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
    });
  });
};
