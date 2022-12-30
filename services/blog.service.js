const BaseService     = require("./base.service");

class BlogService extends BaseService {
    constructor(){
        super({
            limit : 5,
            skip  : 10,
            model : require("../models/blog.model")
        });
    }
}

module.exports = new BlogService();