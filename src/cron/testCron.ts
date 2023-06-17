import cron from "node-cron";

export function testCron() {
  console.log("Test cron task running every hour");
}

cron.schedule("0 * * * *", () => {
  testCron();
});