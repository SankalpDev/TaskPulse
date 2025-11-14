const { jobMap, removeJobFromMap, addJobToMap } = require('./jobMap');
const Job = require('../models/jobModel');

module.exports = (addToQueue) => { 
  function startScheduler() {
    setInterval(async () => {
      const currentTime = Math.floor(Date.now() / 1000); 

      const jobsToRun = jobMap.get(currentTime);
      if (jobsToRun && jobsToRun.length > 0) {
        console.log(`⏰ Found ${jobsToRun.length} job(s) at ${currentTime}`);

      
        for (const job of jobsToRun) {
          if (!job || !job._id) {
            console.error("❌ Skipping invalid job:", job);
            continue;
        }  

         
          const jobObject = job instanceof Job ? job.toObject() : job;
           
         
          addToQueue(jobObject);

         
          removeJobFromMap(jobObject.name, jobObject.timestamp);

         
          // NEW RECURRING BLOCK
if (jobObject.type === 'recurring') {
  // Calculate next run time based on its original timestamp
  const nextTime = jobObject.timestamp + jobObject.interval; 

  // 1. Update the job in the Database for the next run
  await Job.updateOne({ _id: jobObject._id }, { $set: { timestamp: nextTime } });

  // 2. Add it back to the in-memory map for the next run
  let existingJobs = jobMap.get(nextTime);
  if (!existingJobs) {
    existingJobs = [];
    jobMap.set(nextTime, existingJobs); 
  }
  existingJobs.push({ ...jobObject, timestamp: nextTime });

  console.log(`🔁 Rescheduled recurring job "${jobObject.name}" for ${nextTime}`);
}
        }

       
        jobMap.delete(currentTime);
      }
    }, 1000); 
  }

  return { startScheduler };
};