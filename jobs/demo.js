// it's only use for testnet.
const BASE_JOB = require("./basejob");

class DemoSchedule extends BASE_JOB {

	constructor(jobConfig) {
        super(jobConfig);
    }

    async runJob() {
        this.doSomething();
    }

    async doSomething(_config) {
       
    }
}

module.exports = DemoSchedule;