import express, {Application} from "express";

const app: Application = express();

const PORT = process.env.PORT as unknown as number;

app.listen(PORT, () => {
    console.log(`Applikácia beží na porte ${PORT}`);
})