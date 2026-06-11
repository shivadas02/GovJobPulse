function isGraduateJob(job){

 const text = (
  job.title +
  " " +
  job.qualification
 ).toLowerCase();

 const keywords = [

  "graduate",

  "degree",

  "b.tech",

  "btech",

  "be",

  "b.sc",

  "bcom",

  "ba"

 ];

 return keywords.some(
  word =>
  text.includes(word)
 );

}

module.exports =
isGraduateJob;