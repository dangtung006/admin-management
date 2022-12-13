const BaseService     = require("./base.service");
const BookModel       = require("../models/books.model");

class BookService extends BaseService {
    constructor(){
        // super({
        //     model : BookModel,
        //     limit : 10,
        //     skip  : 5
        // });
        this.limit = limit;
        this.skip  = skip;
        this.model = BookModel;
    }

    getByName (name) {
        return this.model.findOne({ name : name })
    }
}

module.exports = BookService;