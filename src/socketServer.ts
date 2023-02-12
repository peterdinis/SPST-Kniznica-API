import io, {Socket} from "socket.io";

/* Fix setup later */
/* io.Server.on('connection', (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
}); */