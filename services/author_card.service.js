const BaseService     = require("./base.service");

class AuthorCardService extends BaseService {
    constructor(){
        super({
            limit : 5,
            skip  : 10,
            model : require("../models/author_card.model")
        });
    }
}

module.exports = new AuthorCardService();