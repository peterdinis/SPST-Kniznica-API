import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import exampleRoute from "./routes/exampleRoute";
import bookRoutes from "./routes/bookRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import studentRoutes from "./routes/studentRoutes";
import morgan from "morgan";
import helmet from "helmet";
import bookingRoutes from "./routes/bookingRoutes";
import cookieParser from "cookie-parser";
import http from "http";
import { Server, Socket } from "socket.io";
import adminRoutes from "./routes/adminRoutes";
import uploadRoutes from "./routes/uploadRoutes";

export const app: Application = express();

app.use(
  cors({
    origin: true,
    methods: "*",
    credentials: true,
  })
);

app.use(express.json({limit: "50mb"}));
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
dotenv.config();

/* Socket.io initialization */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    allowedHeaders: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  },

  /* path: "/socket" */
});

io.on("connection", (socket: Socket) => {
  console.log("Connection work");
  console.log(`⚡: ${socket.id} user just connected!`);
  io.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

const PORT = process.env.PORT as unknown as number;

app.use(exampleRoute);
app.use(bookRoutes);
app.use(categoryRoutes);
app.use(studentRoutes);
app.use(bookingRoutes);
app.use(adminRoutes);
app.use(uploadRoutes);

server.listen(PORT, () => {
  console.log(`Applikácia beží na porte ${PORT}`);
});
