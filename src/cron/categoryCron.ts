import db from "../db";
import cron from "node-cron";
import { getErrorMessage } from "../helpers/catchErrorMessage";
import { DateTime } from 'luxon';

export async function displayCategoriesOrderedByCreationDate() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    console.log(categories);
  } catch (error: unknown) {
    getErrorMessage(error);
  }
}

// Schedule the job to run at your desired interval
cron.schedule('0 9 * * *', async () => {
  console.log('Running job to display books ordered by creation date...');

  // Convert current date and time to the specified timezone
  const londonTime = DateTime.now().setZone('Europe/London');

  console.log(`Current time in London: ${londonTime.toISO()}`);

  await displayCategoriesOrderedByCreationDate();
}, { scheduled: true });
