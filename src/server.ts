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
import { testCron } from "./cron/testCron";
import messageRoutes from "./routes/messageRoutes";
import { displayBooksOrderedByCreationDate } from "./cron/bookCron";

export const app: Application = express();

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

app.use(
  cors({
    origin: true,
    methods: "*",
  })
);

app.use(compression());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
dotenv.config();

const PORT = process.env.PORT as unknown as number || 8111;

app.use(exampleRoute);
app.use(bookRoutes);
app.use(categoryRoutes);
app.use(teacherRoutes);
app.use(studentRoutes);
app.use(bookingRoutes);
app.use(adminRoutes);
app.use(authorRoutes);
app.use(messageRoutes);

testCron();
displayBooksOrderedByCreationDate();
displayBooksOrderedByCreationDate();

app.listen(PORT, () => {
    console.log(`Applikácia beží na porte ${PORT}`)
});
