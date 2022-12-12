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
    },
    getCurrentTimeStr() {
        return Moment().format("YYYY-MM-DD hh:mm:ss");
    },

    getTimeStr(timestamp) {
        return Moment(timestamp).format("YYYY-MM-DD hh:mm:ss");
    },

    getCurrentDateStr() {
        return Moment().format("YYYY-MM-DD");
    },

    getStrDateToValue(strYYYYMMDDhhmmss) {
        return Moment.tz(strYYYYMMDDhhmmss, "YYYY-MM-DD hh:mm:ss", "Asia/Ho_Chi_Minh").valueOf();
    },

    getStartOfDayTz(strYYYYMMDD) {
        let time = Moment(strYYYYMMDD, "YYYY-MM-DD", "Asia/Ho_Chi_Minh").valueOf();
        return Moment(time).tz("Asia/Ho_Chi_Minh").startOf('day');
    },

    formatLocalTime(time) {
        return Moment(time).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
    },

    formatUTCTime(time) {
        return Moment(time).utc().format("YYYY-MM-DD HH:mm:ss");
    },
    
    getEndOfDayTz(strYYYYMMDD) {
        let time = Moment(strYYYYMMDD, "YYYY-MM-DD", "Asia/Ho_Chi_Minh").valueOf();
        return Moment(time).tz("Asia/Ho_Chi_Minh").endOf('day');
    }

};

module.exports = DATETIME_HELPER;

// const MomentTimeZone           = require('moment-timezone');
// /* -----------------------------------------------------
// *  DECLARE TIME ZONE
// *  -----------------------------------------------------
// */
// const TIME_ZONE_SIGAPORE       = "Asia/Singapore";
// const TIME_ZONE_VIETNAM_HCM    = "Asia/Ho_Chi_Minh";
// const TIME_ZONE_VIETNAM_HN     = "Asia/Ha_Noi";

// module.exports = {
//     convertToDate: (str) => {
//         return MomentTimeZone(str, 'DD/MM/YYYY').tz('Asia/Ho_Chi_Minh').toDate();
//     },

//     convertDateToStr: (dt) => {
//         return MomentTimeZone(dt).format('DD/MM/YYYY');
//     },

//     getTimeSingapore(date) { return MomentTimeZone.tz(date, TIME_ZONE_SIGAPORE); },

//     getTimeVietNamHCM(date) { return MomentTimeZone.tz(date, TIME_ZONE_VIETNAM_HCM); },

//     getTimeVietNamHN(date) { return MomentTimeZone.tz(date, TIME_ZONE_VIETNAM_HN); },

//     setTimeVietNamHCM(date, hour, min) { return MomentTimeZone.tz(date, TIME_ZONE_VIETNAM_HCM).hour(hour).minute(min); },

//     setTimeVietNam(timeStamp) { return MomentTimeZone.tz(timeStamp, TIME_ZONE_VIETNAM_HCM).format('DD/MM/YYYY HH:mm:ss'); },
// }