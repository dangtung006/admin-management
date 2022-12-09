const { GLOBAL_CONFIG }  = require("../configs");

const LOG_HELPER = function(){
    const log4js  = require("log4js");
    const opts    =  GLOBAL_CONFIG["defaultLog4jConfig"];

    return {
        getLogger : function(name, folder = null){
            let filename = `logs/${name}.log`;
            if (folder) filename = `logs/${folder}/${name}.log`;
            opts.appenders[name] = { type: "file", filename: filename };
            opts.categories[name] = { appenders: ["console", name], level: config.logLevel };
            log4js.configure(opts);
            return log4js.getLogger(name);
        },

        getDefaultLogger : function(){
            log4js.configure(opts);
            return log4js.getLogger();
        }

    }
};
module.exports = LOG_HELPER;