class BaseService {
    constructor(opt){
        this.model = opt.model;
        this.limit = opt.limit ? opt.limit : 10;
        this.page  = opt.page ? opt.page : 1;
    }

    // Get Data
    getById(id) {
        return this.model.findOne({ _id: id , status: { $ne: -1 } });
    }

    getByEmail(email) {
        let searchbleEmail = email ? email.toLowerCase() : '';
        return this.model.findOne({ searchbleEmail, status: { $ne: -1 } });
    }

    getList(page, limit){

        this.page  = page  ? page  : this.page;
        this.limit = limit ? limit : this.limit;

        return this.model.find({ status: { $ne: -1 } }).skip((this.page - 1) * this.limit).limit(this.limit).sort({ createdAt : -1 });
    }

    countAll() {
		return this.model.count({ status: { $ne: -1 }});
	}

    test(){
        console.log("test service");
    }

    // Handle Data
    async save(options){
        let data = await this.getById(options.id);
        if(data) return await this.update(data, options);
        return await this.create(options);
    }

    create(options) {
        if(!this.isOBJ(options)) 
            throw new Error("In valid Data Types");
        return (new this.model(options)).save();
    }

    replaceOne(id, fields = {}){
        return this.model.replaceOne({ _id : id}, fields)
    }


    deleteOne(id){
        return this.model.deleteOne({ _id : id });
    }

    updateOne(filter = {} , fields ={}){
        return this.model.updateOne(filter, { $set : fields });
    }

    updateMany(filter = {} , fields ={}){
        return this.model.updateMany(filter, { $set : fields });
    }

    update(collection, fieldNames){
        if(
            !this.isOBJ(collection) || 
            !this.isOBJ(fieldNames)
        ) 
            throw new Error("In valid Data Types");

        for(let key in fieldNames){
            if(typeof fieldNames[key] != 'undefined') {
                collection[key] = fieldNames[key];
            }
        }

        return collection.save();
    }

    isOBJ(opt){
        if (
            typeof opt === 'object' &&
            !Array.isArray(opt) &&
            opt !== null
        ) {
            return true;
        }
        return false;
    }
}

module.exports = BaseService