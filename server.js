const User =require("./src/models/User");
require("dotenv").config();

const connectDB =
require("./src/database/connect");

const bot =
require("./src/bot/bot");

require(
"./src/scheduler/jobScheduler"
);

require("dotenv").config();

const express = require("express");
const app = express();

const connectDB =
require("./src/database/connect");

const bot =
require("./src/bot/bot");

require(
"./src/scheduler/jobScheduler"
);

// Health check route for Render
app.get("/", (req, res) => {
  res.send("GovJobPulse Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB();

bot.start(async (ctx) => {

 let user =
 await User.findOne({
  telegramId:
  ctx.from.id
 });

 if(!user){

  await User.create({

   telegramId:
   ctx.from.id,

   username:
   ctx.from.username,

   firstName:
   ctx.from.first_name,

   subscriptions:[]
  });

 }

 ctx.reply(
`🚀 Welcome to GovJobPulse

/latest

/search

/subscribe`
 );

});

const Job =
require("./src/models/Job");

bot.command("testjob",

async(ctx)=>{

 await Job.create({

  title:
  "SSC CGL 2026",

  organization:
  "SSC",

  category:
  "ssc",

  qualification:
  "Graduate",

  vacancies:
  14582,

  salary:
  "₹35,000-₹1,12,000",

  lastDate:
  "05 July 2026",

  applyLink:
  "https://ssc.gov.in",

  notificationLink:
  "https://ssc.gov.in",

  source:
  "SSC"
 });

 ctx.reply(
 "Test Job Added"
 );

});

bot.command("latest",

async(ctx)=>{

 const jobs =
 await Job.find()
 .sort({
  createdAt:-1
 })
 .limit(10);

 if(jobs.length===0){

  return ctx.reply(
   "No Jobs Found"
  );

 }

 let msg = "";

 jobs.forEach(job=>{

  msg +=
`🔔 ${job.title}

🏛 ${job.organization}

🎓 ${job.qualification}

📅 ${job.lastDate}

🔗 ${job.applyLink}

--------------------

`;

 });

 ctx.reply(msg);

});


bot.launch();

console.log(
"✅ GovJobPulse Started"
);

process.once("SIGINT",
() => bot.stop("SIGINT"));

process.once("SIGTERM",
() => bot.stop("SIGTERM"));

const postJob =
require("./src/services/postJob");

bot.command("posttest",

async(ctx)=>{

 const job = {

  title:
  "SSC CGL 2026",

  organization:
  "SSC",

  qualification:
  "Graduate",

  lastDate:
  "05 July 2026",

  applyLink:
  "https://ssc.gov.in",

  notificationLink:
  "https://ssc.gov.in"

 };

 await postJob(job);

 ctx.reply(
  "Posted To Channel"
 );

});

bot.command("stats",

async(ctx)=>{

 const Job =
 require("./src/models/Job");

 const count =
 await Job.countDocuments();

 ctx.reply(
  `📊 Total Jobs: ${count}`
 );

});


bot.command("search",

async(ctx)=>{

 const Job =
 require("./src/models/Job");

 const jobs =
 await Job.find()
 .limit(5);

 if(jobs.length===0){

  return ctx.reply(
   "No Jobs Found"
  );

 }

 let msg = "";

 jobs.forEach(job=>{

  msg +=
`${job.title}

${job.organization}

\n`;

 });

 ctx.reply(msg);

});

bot.command("graduate",

async(ctx)=>{

 const Job =
 require("./src/models/Job");

 const jobs =
 await Job.find({
  graduateOnly:true
 })
 .sort({
  createdAt:-1
 })
 .limit(10);

 if(jobs.length===0){

  return ctx.reply(
   "No Graduate Jobs Found"
  );

 }

 let msg =
 "🎓 Graduate Jobs\n\n";

 jobs.forEach(job=>{

  msg +=
`🔔 ${job.title}

🏛 ${job.organization}

📅 ${job.lastDate}

🔗 ${job.applyLink}

--------------------

`;

 });

 ctx.reply(msg);

});

bot.command("alljobs",

async(ctx)=>{

 const Job =
 require("./src/models/Job");

 const jobs =
 await Job.find();

 ctx.reply(
  `Total Jobs: ${jobs.length}`
 );

 console.log(jobs);

});

bot.command("digest",

async(ctx)=>{

 const Job =
 require("./src/models/Job");

 const jobs =
 await Job.find()
 .sort({
  createdAt:-1
 })
 .limit(20);

 let msg =
 "📢 Daily Govt Jobs Digest\n\n";

 jobs.forEach(job=>{

  msg +=
`🔔 ${job.title}

📅 ${job.lastDate}

\n`;

 });

 ctx.reply(msg);

});

bot.command("clearjobs",

async(ctx)=>{

 const Job =
 require("./src/models/Job");

 await Job.deleteMany({});

 ctx.reply(
  "All Jobs Deleted"
 );

});

bot.command("graduatescount",

async(ctx)=>{

 const Job =
 require("./src/models/Job");

 const count =
 await Job.countDocuments({
  graduateOnly:true
 });

 ctx.reply(
  `Graduate Jobs: ${count}`
 );

});
const scrapeSSC =
require("./src/scrapers/sscScraper");

bot.command("runscraper",

async(ctx)=>{

 await scrapeSSC();

 ctx.reply(
  "Scraper Executed"
 );

});

bot.command("checkjobs",

async(ctx)=>{

 const Job =
 require("./src/models/Job");

 const jobs =
 await Job.find();

 console.log(jobs);

 ctx.reply(
  `Jobs Found: ${jobs.length}`
 );

});