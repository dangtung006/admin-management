
const VALIDATE_HELPER = function(){
    return {
        joi :  require('joi'),

        makeValidate : async function(joiObj, data){
            try{
                let { error } = await joiObj.validate(data);
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
};

module.exports = VALIDATE_HELPER;
