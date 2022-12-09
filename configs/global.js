require('dotenv').config();
module.exports = {
    port : 3000,
    host : "",
    environment : "",
    logLevel: "debug",
    defaultLog4jConfig: {

        appenders: {
            console: { type: "console" },
            app: { type: "file", filename: "logs/debug.log" }
        },

        categories: {
            default: { appenders: ["console", "app"], level: "debug" }
        }
    }
}