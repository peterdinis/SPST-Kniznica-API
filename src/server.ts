import express, {Application} from "express";
import cors from "cors";
import dotenv from "dotenv";
import exampleRoute from "./routes/exampleRoute";
import bookRoutes from "./routes/bookRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import morgan from "morgan";

const app: Application = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(morgan("dev"));
dotenv.config();

const PORT = process.env.PORT as unknown as number;

app.use(exampleRoute);
app.use(bookRoutes);
app.use(categoryRoutes);

app.listen(PORT, () => {
    console.log(`Applikácia beží na porte ${PORT}`);
})