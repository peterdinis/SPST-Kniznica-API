import express, {Application} from "express";
import cors from "cors";
import dotenv from "dotenv";
import exampleRoute from "./routes/exampleRoute";
import bookRoutes from "./routes/bookRoutes"

const app: Application = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT as unknown as number;

app.use(exampleRoute);
app.use(bookRoutes);

app.listen(PORT, () => {
    console.log(`Applikácia beží na porte ${PORT}`);
})