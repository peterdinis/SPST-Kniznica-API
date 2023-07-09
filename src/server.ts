import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import exampleRoute from "./routes/exampleRoute";
import bookRoutes from "./routes/bookRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import morgan from "morgan";
import helmet from "helmet";
import teacherRoutes from "./routes/teacherRoutes";
import studentRoutes from "./routes/studentRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import adminRoutes from "./routes/adminRoutes";
import compression from "compression";
import authorRoutes from "./routes/authorRoutes";
import errorHandler from "errorhandler";
import http from "http";
import { Server } from "socket.io";

/* Todo: Later update setupp */

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
    origin: "http://localhost:3000",
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

app.use(exampleRoute);
app.use(bookRoutes);
app.use(categoryRoutes);
app.use(teacherRoutes);
app.use(studentRoutes);
app.use(bookingRoutes);
app.use(adminRoutes);
app.use(authorRoutes);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected");
  

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
server.listen(PORT, () => {
  console.log(`Applikácia beží na porte ${PORT}`);
});
