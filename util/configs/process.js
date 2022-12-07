const { PROCESS_CONFIG } = require('../../configs/index');

const CONFIGS_HEPLER = {
    getProcessByName : function(name){
        if(typeof PROCESS_CONFIG[name] == 'undefined') return  null;
        return PROCESS_CONFIG[name];
    },
}

module.exports = CONFIGS_HEPLER;