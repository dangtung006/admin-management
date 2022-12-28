const BaseService     = require("./base.service");

class ProductService extends BaseService {
    constructor(){
        super({
            limit : 5,
            skip  : 10,
            model : require("../models/product.model")
        });
    }

    getByName (name) {
        return this.model.findOne({ name : name })
    }
    
    search(a){
        console.log("aaaaaa");
    }
}

module.exports = new ProductService();