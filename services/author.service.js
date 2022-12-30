const BaseService     = require("./base.service");

class AuthorService extends BaseService {
    constructor(){
        super({
            limit : 5,
            skip  : 10,
            model : require("../models/author.model")
        });
    }

    getAuthors(){
        return this.model.find().populate("authorCard")
    }
}

module.exports = new AuthorService();