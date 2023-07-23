import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import morgan from "morgan";
import helmet from "helmet";
import teacherRoutes from "./routes/teacherRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import studentRoutes from "./routes/studentRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import adminRoutes from "./routes/adminRoutes";
import compression from "compression";
import authorRoutes from "./routes/authorRoutes";
import errorHandler from "errorhandler";
import http from "http";
import { Server, Socket} from "socket.io";

export const app: Application = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    allowedHeaders: "*",
    methods: "*",
    exposedHeaders: "*",
  }
});

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL as unknown as string,
    allowedHeaders: "*",
    methods: "*",
    exposedHeaders: "*",
  })
);

app.use(compression());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
dotenv.config();

const PORT = (process.env.PORT as unknown as number) || 8111;

app.use(bookRoutes);
app.use(categoryRoutes);
app.use(teacherRoutes);
app.use(studentRoutes);
app.use(bookingRoutes);
app.use(adminRoutes);
app.use(authorRoutes);
app.use(notificationRoutes);

// Socket.IO connection
io.on('connection', (socket: Socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});
server.listen(PORT, () => {
  console.log(`Applikácia beží na porte ${PORT}`);
});
