const BaseService     = require("./base.service");

class UserService extends BaseService {
    constructor(){
        super({
            limit : 5,
            skip  : 10,
            model : require("../models/user.model")
        });
    }
}

module.exports = new UserService();