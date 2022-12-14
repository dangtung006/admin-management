const BaseService     = require("./base.service");

class BookService extends BaseService {
    constructor(){
        super();
        this.limit = 5;
        this.skip  = 10;
        this.model = require("../models/books.model");;
    }

    getByName (name) {
        return this.model.findOne({ name : name })
    }

    async save(options){
        let book = this.getById({ id : options._id });
        if(!book) return await this._create(options);
        await this._update({ ...options, collection : book  });
    }

    async _update({
        collection,
        name,
        authors,
        publisher,
        parent
    }, _sesstion){

        if(typeof name != 'undefined')  collection['name'] = name;
        if(typeof authors != 'undefined')  collection['authors'] = authors;
        if(typeof publisher != 'undefined')  collection['publisher'] = authors;
        if(typeof parent != 'undefined')  collection['parent'] = authors;

        return collection.save();
    }

    async _create(options){
        return (new this.model(options)).save();
    }

    async search(){
        
    }
}

module.exports = new BookService();