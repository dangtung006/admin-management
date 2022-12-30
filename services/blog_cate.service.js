const BaseService     = require("./base.service");

class BlogCateService extends BaseService {
    constructor(){
        super({
            limit : 5,
            skip  : 10,
            model : require("../models/blog_cate.model")
        });
    }

    getBlogCateList(){
        return this.model
            .find()
            .populate({ 
                path : "children"
            })
            .populate({ 
                path : "author", 
                populate : { path : "authorCard" }
            });
    }
}

module.exports = new BlogCateService();