const LOGGER_HELPER = require("../util/log-helper")();

module.exports = function(){
    const logger   = LOGGER_HELPER.getDefaultLogger();
    global.logger  = logger;
}