const BaseService     = require("./base.service");

class PaymentMethodService extends BaseService {
    constructor(){
        super({
            limit : 5,
            skip  : 10,
            model : require("../models/pamentMethods.model")
        });
    }
}

module.exports = new PaymentMethodService();