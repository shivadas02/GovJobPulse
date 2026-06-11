const bot =
require("../bot/bot");

async function postJob(job){

 try{

  await bot.telegram.sendMessage(

   process.env.CHANNEL_USERNAME,

`🔔 ${job.title}

🏛 Organization:
${job.organization}

🎓 Qualification:
${job.qualification}

📅 Last Date:
${job.lastDate}

🔗 Apply:
${job.applyLink}

📄 Notification:
${job.notificationLink}`

  );

 }catch(error){

  console.log(error);

 }

}

module.exports =
postJob;