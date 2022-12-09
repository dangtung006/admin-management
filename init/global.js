const LOGGER_HELPER     = require("../util/log-helper")();
const VALIDATE_HELPER   = require("../util/validate-helper")();

module.exports = function(){
    global.logger     = LOGGER_HELPER.getDefaultLogger();
    global.validation = VALIDATE_HELPER;
}