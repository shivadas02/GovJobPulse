const Job =
require("../models/Job");

async function saveJob(job){

 try{

  const exists =
  await Job.findOne({

   title: job.title,

   source: job.source

  });

  if(exists){

   console.log(
    "Duplicate Job Found"
   );

   return false;
  }

  const newJob =
  await Job.create(job);

  console.log(
   "Saved Job:",
   newJob._id
  );

  return true;

 }catch(error){

  console.log(
   "SAVE ERROR:",
   error
  );

  return false;

 }

}

module.exports =
saveJob;