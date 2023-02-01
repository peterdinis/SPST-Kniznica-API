import express, {Application} from "express";
import cors from "cors";
import dotenv from "dotenv";

const app: Application = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT as unknown as number;

app.listen(PORT, () => {
    console.log(`Applikácia beží na porte ${PORT}`);
})