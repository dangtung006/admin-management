const BaseService     = require("./base.service");

class ClientService extends BaseService {
    constructor(){
        super({
            limit : 5,
            skip  : 10,
            model : require("../models/client.model")
        });
    }

    getDetail(id){
        return this.model.findOne({ _id : id}).populate('paymentMethods').exec();
    }
}

module.exports = new ClientService();