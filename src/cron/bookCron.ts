import db from "../db";
import cron from "node-cron";
import { getErrorMessage } from "../helpers/catchErrorMessage";

const date = new Date();

const londonTime = date.toLocaleString("en-GB", {timeZone: "Europe/London"});

export async function displayBooksOrderedByCreationDate() {
  try {
    // Retrieve all books from the database and order them by creation date in ascending order
    const books = await db.book.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    console.log(books);
  } catch (error: unknown) {
    getErrorMessage(error);
  }
}

// Schedule the job to run at your desired interval
cron.schedule('0 9 * * *', async () => {
  console.log('Running job to display books ordered by creation date...');
  await displayBooksOrderedByCreationDate();
}, { scheduled: true, timezone: londonTime });
