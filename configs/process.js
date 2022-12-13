module.exports = {
    "db" : {
        mongoConnectionString: "mongodb://127.0.0.1:27017/admin_management_demo?retryWrites=true&w=majority",
        dbConnectOpt : {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true
        },

        useMongoSession : 1
    },

    "notification" : {
        "telegram" : {
            apiUrl: "baseurl/api/noti-msg/",
            minorChatId: "",
            mainChatId: "",
            errorChatId: "",
            telegramToken:""
        },

        "sms" : {
            
        }
    }
}