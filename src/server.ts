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

export const app: Application = express();

app.use(cors({
    origin: "*",
    methods: "*", 
    allowedHeaders: "*",
       
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
dotenv.config();

const PORT = process.env.PORT as unknown as number;

app.use(exampleRoute);
app.use(bookRoutes);
app.use(categoryRoutes);
app.use(studentRoutes);
app.use(bookingRoutes);

app.listen(PORT, () => {
    console.log(`Applikácia beží na porte ${PORT}`);
})