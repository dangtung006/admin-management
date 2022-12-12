
class BaseService {

    constructor(opt){
        for(let key in opt) {
            this[key] = opt[key];
        }
    }

    getById(id){
        return this.model.findOne({ _id : id })
    }

    getList(query){
        let limit = this.limit ? this.limit : 10000;
        let skip  = this.skip  ? this.skip : 0;
        return this.model.find(query).limit(limit).skip(skip);
    }

    count(query){
        return this.model.count(query);
    }

    create(_options){
        return this.model.create(_options);
        // return (new this.model(_options)).save();
    }

}   

module.exports = BaseService;