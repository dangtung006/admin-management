const BaseService     = require("./base.service");

const EmplyeesService = function(){
    var  _employeeService  = null;
    const model      = require("../models/employees.js");
    const services   = {
        model : model,
        // limit : 10,
        // skip  : 5,

        getByEmail : function(email){
            return model.findOne({ email : email })
        },

        getByName : function(name) {
            return model.findOne({ name : name })
        },

        addUserAsset : function(user, balaceInfo){
            user.balances.push(balaceInfo);
            return  user.save();
        }
    }

    if(!_employeeService) _employeeService = new BaseService(services);
    return _employeeService;
    
}

module.exports = EmplyeesService;