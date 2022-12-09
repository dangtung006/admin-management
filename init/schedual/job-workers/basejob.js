/**
 * Base class for job.
 *
 * @class BaseJob
 */
 const { getLogger } = require("../utils/logger.util");

 class BASE_JOB {
     constructor(jobConfig) {
        this.jobConfig = jobConfig;
        this.logger = getLogger("job-" + this.jobConfig.name.toLowerCase());
     }
 
    getJobTime() {
        return this.jobConfig.jobTime;
    }
   
    async runJob() {}
 }
 module.exports = BASE_JOB;