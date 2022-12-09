const { wait } = require("../util/date-time-helper");

const MongooseModule = require('mongoose');

const DB_HELPER = function (opt){

    const url        = opt && opt.mongoConnectionString ? opt.mongoConnectionString : null;
    const optConnect =  opt && opt.dbConnectOpt ? opt.dbConnectOpt : null;
    const db         = MongooseModule.connection;

    db.once('open', () => {
        logger.info('Connected to database');
    });

    const _load =  async function(count = 0){
        if(!url || !optConnect)  return console.log("In valid connect");

        try{
            return await MongooseModule.connect(url, optConnect);
        }catch(e){
            if(count <= 10) {
                await wait(1500);
                return _load(count);
            }
            return new Error("Fail to connect DB")
        }
    };

    return {
        load : _load
    }
}

module.exports = DB_HELPER;