const { APP_CONFIG } = require('../configs/index');

const CONFIGS_HEPLER = {

    findOne : function(key){
        if(typeof APP_CONFIG[key] == 'undefined') return  null;
        return APP_CONFIG[key];
    },

    find : function(configs){
        configsToGet = []
        for(let idx = 0; idx < configs.length; idx++){
            const key = configs[idx];
            if(APP_CONFIG.hasOwnProperty(key)){
                configsToGet.push(APP_CONFIG[key]);
            }
        }
        return configsToGet;
    },

    findAll : function(){
        return APP_CONFIG;
    }
}

module.exports = CONFIGS_HEPLER;