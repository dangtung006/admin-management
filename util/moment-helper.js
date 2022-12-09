const Moment_TZ = require('moment-timezone');
const Moment = require('moment');

const DEFAULT_TIME_ZONE = "America/New_York";

const DATETIME_HELPER = {

    START: null,

    setStartDT: () => {
        DATETIME_HELPER.START = DATETIME_HELPER.getCurrentDT()
    },

    getStartDuration: () => {
        const startDT = DATETIME_HELPER.getTimezoneDT(DATETIME_HELPER.START).format("DD MMM YYYY HH:mm:ss");
        return `Has been running since ${startDT}`;
    },

    getCurrentDT: (timezone = DEFAULT_TIME_ZONE) => {
        return Moment_TZ.tz(Moment(), timezone);
    },

    getTimezoneDT: (date, timezone = DEFAULT_TIME_ZONE) => {
        return Moment_TZ.tz(date, timezone);
    },


    getCurrentTimezoneDate: (timezone = DEFAULT_TIME_ZONE) => {
        return Moment_TZ.tz(Moment(), timezone).hour(0).minute(0).second(0).millisecond(0);
    },


    getTimezoneDate: (date, timezone = DEFAULT_TIME_ZONE) => {
        return Moment_TZ.tz(date, timezone).hour(0).minute(0).second(0).millisecond(0);
    },

    getUtcOffsetDT: (date, offset = 0) => {
        return Moment(date).utcOffset(offset);
    },

    getUtcOffsetDate: (date, offset = 0) => {
        return Moment(date).hour(0).minute(0).second(0).millisecond(0).utcOffset(offset);
    },

    getStartDateByHours(date, hour, timezone = DEFAULT_TIME_ZONE) {
        return Moment_TZ.tz(date, timezone).hour(hour).minute(0).second(0).millisecond(0); 
    },

    getStarDateByTimezone(date, timezone = DEFAULT_TIME_ZONE) { 
        return Moment_TZ.tz(date, timezone).hour(0).minute(0).second(0).millisecond(0); 
    },
    getEndDateByTimezone(date, timezone = DEFAULT_TIME_ZONE) { 
        return Moment_TZ.tz(date, timezone).hour(23).minute(59).second(59).millisecond(999); 
    }

};

module.exports = DATETIME_HELPER;