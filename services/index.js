const serviceFactory = {
    services : {
        employees : null
    },

    getService(service){
        switch(service) {

            case "employees": {
                if(!this.services['employees']){
                    this.services['employees'] = require("./employees")();
                } 
                return this.services[service];
            }

            default:
                return null;
        }
    }
}

module.exports = serviceFactory;