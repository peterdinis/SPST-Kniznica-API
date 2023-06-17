import cron from "node-cron";

cron.schedule("* * * ", () => {
  console.log("Test cron task running every hour");
});
