const saveJob =
require("../services/saveJob");

async function scrapeSSC(){

 try{

  console.log("SSC Scraper Running");

  const job = {

   title:
   "SSC Graduate Recruitment Test V3",

   organization:
   "Staff Selection Commission",

   category:
   "SSC",

   qualification:
   "Graduate",

   state:
   "All India",

   graduateOnly:
   true,

   vacancies:
   5000,

   salary:
   "₹35,000",

   lastDate:
   "30 June 2026",

   applyLink:
   "https://ssc.gov.in",

   notificationLink:
   "https://ssc.gov.in",

   source:
   "SSC"

  };

  console.log("Attempting Save");

  const result =
  await saveJob(job);

  console.log(
   "Save Result:",
   result
  );

 }catch(error){

  console.log(
   "SCRAPER ERROR:",
   error
  );

 }

}

module.exports =
scrapeSSC;