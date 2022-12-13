const BaseService     = require("./base.service");
const BookModel       = require("../models/books.model");

class BookService extends BaseService {
    constructor(){
        super();
        this.limit = 5;
        this.skip  = 10;
        this.model = BookModel;
    }

    getByName (name) {
        return this.model.findOne({ name : name })
    }

    async save(){

    }

    async update(){

    }
}

module.exports = new BookService();