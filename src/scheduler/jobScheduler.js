const cron = require("node-cron");

const scrapeSSC =
require("../scrapers/sscScraper");

cron.schedule(

"* * * * *",

async()=>{

 const bot =
 require("../bot/bot");

 await bot.telegram.sendMessage(

 process.env.CHANNEL_USERNAME,

 "📢 Good Morning\nDaily Job Digest Ready"

 );

}

);