import db from "../db";
import cron from "node-cron";

/* Job ktorý kontroluje dátum požičania default 7 dní ak ten dátum presiahol 7 dní upozorní používateľa že má knihu vrátiť */

export async function checkBookingDate(username: string) {
    const findUserInBooking = await db.booking.findFirst({
        where: {
            username
        }
    });

    if(!findUserInBooking) {
        throw new Error("User not found");
    }
}


/* cron.schedule('0 0 * * *', async () => {
    console.log('Running cron job...');
    await checkBookingDate();
}); */