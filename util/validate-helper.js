/*
* create by dangtung at 20/12/2022
*/
const ValidateHelper = function(){
    const Joi          = require('joi');

    return {
        getJoi    : function(){
            return Joi;
        },

        getJoiOBJ : function(obj={}){
            return Joi.object(obj);
        },

        makeValidate : async function(joiOBJ , data){
            try{
                let { error } = await joiOBJ.validate(data);
                return error && error.details  ? error.details : {};
            }catch(err){
                throw new Error(err);
            }
        },

        required(_criteria, _message) {
            if (_criteria == true) return true;
            throw new Error(_message);
        }
    }
}

module.exports = ValidateHelper
