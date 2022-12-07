module.exports = {
    "db" : {
        mongoConnectionString: "mongodb://127.0.0.1:27017/person?retryWrites=true&w=majority",
        dbConnectOpt : {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true
        },
    },

    "log" : {
        
    }
}