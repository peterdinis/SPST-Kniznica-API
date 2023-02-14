import express, {Application} from "express";
import cors from "cors";
import dotenv from "dotenv";
import exampleRoute from "./routes/exampleRoute";
import bookRoutes from "./routes/bookRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import studentRoutes from "./routes/studentRoutes";
import morgan from "morgan";
import helmet from "helmet";
import bookingRoutes from "./routes/bookingRoutes"
import cookieParser from "cookie-parser";
import http from "http";
import { Server, Socket } from "socket.io";
import { SocketServer } from "./SocketServer";

export const app: Application = express();

app.use(cors({
    origin: "*",
    methods: "*", 
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept Bearer",
    credentials: true   
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
dotenv.config();

/* Socket.io initialization */
const server = http.createServer(app);
/* const io = new Server(server, {
    cors: {
        origin: "*",
        methods: "*",
        allowedHeaders: "*"
    }
})

io.on("connection", (socket: Socket) => {
    console.log("Connection work");
    SocketServer(socket);
}) */

const PORT = process.env.PORT as unknown as number;

app.use(exampleRoute);
app.use(bookRoutes);
app.use(categoryRoutes);
app.use(studentRoutes);
app.use(bookingRoutes);

app.listen(PORT, () => {
    console.log(`Applikácia beží na porte ${PORT}`);
})