
class BaseService {

    constructor(){
    }

    getById(id){
        return this.model.findOne({ _id : id })
    }

    getList({ page, limit }) {
		return this.model.find({status: { $ne: -1 } }).sort({ "createdAt": -1 }).skip((page - 1) * limit).limit(limit);
	}

	countAll({}) {
		return this.model.count({status: { $ne: -1 } });
	}

    create(_options){
        return this.model.create(_options);
        // return (new this.model(_options)).save();
    }

}   

module.exports = BaseService;