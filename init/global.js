const LOGGER_HELPER = require("../util/log-helper")();

module.exports = function(){
    global.logger  = LOGGER_HELPER.getDefaultLogger();
}