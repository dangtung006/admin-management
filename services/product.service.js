const BaseService     = require("./base.service");

class ProductService extends BaseService {
    constructor(){
        super({
            limit : 5,
            skip  : 10,
            model : require("../models/product.model")
        });
    }

    search(k, v){
        return this.model.find({
            "specs": {
                $elemMatch: {
                    k : k,
                    v : v
                }
            }
        });
    }
}

module.exports = new ProductService();