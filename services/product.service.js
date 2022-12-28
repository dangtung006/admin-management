const BaseService     = require("./base.service");

class ProductService extends BaseService {
    constructor(){
        super({
            limit : 5,
            skip  : 10,
            model : require("../models/product.model")
        });
    }

    search(a){
        
    }
}

module.exports = new ProductService();