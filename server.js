require("dotenv").config();

const connectDB = require("./src/database/connect");
const bot = require("./src/bot/bot");

const User = require("./src/models/User");
const Job = require("./src/models/Job");
const postJob = require("./src/services/postJob");
const scrapeSSC = require("./src/scrapers/sscScraper");

require("./src/scheduler/jobScheduler");

// ---------------- START APP ----------------
async function start() {
  try {
    // 1. CONNECT DB FIRST
    await connectDB();
    console.log("✅ MongoDB Connected");

    // 2. START BOT AFTER DB
    bot.launch();
    console.log("✅ GovJobPulse Started");

    // ---------------- GRACEFUL SHUTDOWN ----------------
    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));

    // ---------------- BOT COMMANDS ----------------

    bot.start(async (ctx) => {
      let user = await User.findOne({ telegramId: ctx.from.id });

      if (!user) {
        await User.create({
          telegramId: ctx.from.id,
          username: ctx.from.username,
          firstName: ctx.from.first_name,
          subscriptions: []
        });
      }

      ctx.reply(`🚀 Welcome to GovJobPulse

/latest
/search
/subscribe`);
    });

    bot.command("testjob", async (ctx) => {
      await Job.create({
        title: "SSC CGL 2026",
        organization: "SSC",
        category: "ssc",
        qualification: "Graduate",
        vacancies: 14582,
        salary: "₹35,000-₹1,12,000",
        lastDate: "05 July 2026",
        applyLink: "https://ssc.gov.in",
        notificationLink: "https://ssc.gov.in",
        source: "SSC"
      });

      ctx.reply("Test Job Added");
    });

    bot.command("latest", async (ctx) => {
      const jobs = await Job.find().sort({ createdAt: -1 }).limit(10);

      if (!jobs.length) return ctx.reply("No Jobs Found");

      let msg = "";

      jobs.forEach(job => {
        msg += `🔔 ${job.title}

🏛 ${job.organization}

🎓 ${job.qualification}

📅 ${job.lastDate}

🔗 ${job.applyLink}

--------------------\n\n`;
      });

      ctx.reply(msg);
    });

    bot.command("search", async (ctx) => {
      const jobs = await Job.find().limit(5);

      if (!jobs.length) return ctx.reply("No Jobs Found");

      let msg = "";

      jobs.forEach(job => {
        msg += `${job.title}
${job.organization}

`;
      });

      ctx.reply(msg);
    });

    bot.command("stats", async (ctx) => {
      const count = await Job.countDocuments();
      ctx.reply(`📊 Total Jobs: ${count}`);
    });

    bot.command("digest", async (ctx) => {
      const jobs = await Job.find().sort({ createdAt: -1 }).limit(20);

      let msg = "📢 Daily Govt Jobs Digest\n\n";

      jobs.forEach(job => {
        msg += `🔔 ${job.title}
📅 ${job.lastDate}

\n`;
      });

      ctx.reply(msg);
    });

    bot.command("clearjobs", async (ctx) => {
      await Job.deleteMany({});
      ctx.reply("All Jobs Deleted");
    });

    bot.command("graduate", async (ctx) => {
      const jobs = await Job.find({ graduateOnly: true }).limit(10);

      if (!jobs.length) return ctx.reply("No Graduate Jobs Found");

      let msg = "🎓 Graduate Jobs\n\n";

      jobs.forEach(job => {
        msg += `🔔 ${job.title}
🏛 ${job.organization}
📅 ${job.lastDate}
🔗 ${job.applyLink}

--------------------\n\n`;
      });

      ctx.reply(msg);
    });

    bot.command("graduatescount", async (ctx) => {
      const count = await Job.countDocuments({ graduateOnly: true });
      ctx.reply(`Graduate Jobs: ${count}`);
    });

    bot.command("runscraper", async (ctx) => {
      await scrapeSSC();
      ctx.reply("Scraper Executed");
    });

    bot.command("checkjobs", async (ctx) => {
      const jobs = await Job.find();
      ctx.reply(`Jobs Found: ${jobs.length}`);
      console.log(jobs);
    });

    bot.command("posttest", async (ctx) => {
      const job = {
        title: "SSC CGL 2026",
        organization: "SSC",
        qualification: "Graduate",
        lastDate: "05 July 2026",
        applyLink: "https://ssc.gov.in",
        notificationLink: "https://ssc.gov.in"
      };

      await postJob(job);

      ctx.reply("Posted To Channel");
    });

  } catch (err) {
    console.error("❌ Startup Error:", err);
  }
}

start();