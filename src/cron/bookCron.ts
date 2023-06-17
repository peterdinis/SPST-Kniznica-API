import db from "../db";
import cron from "node-cron";

export async function displayBooksOrderedByCreationDate() {
  try {
    // Retrieve all books from the database and order them by creation date in ascending order
    const books = await db.book.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  } catch (error) {
    console.error("Error displaying books ordered by creation date:", error);
  }
}

// Schedule the job to run at your desired interval
cron.schedule("0 9 * * *", async () => {
  console.log("Running job to display books ordered by creation date...");
  await displayBooksOrderedByCreationDate();
});
