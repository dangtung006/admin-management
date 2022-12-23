/*
* create by dangtung at 20/12/2022
*/
const JWT_HELPER = function(){
    const Jwt = require("jsonwebtoken");

    const TIME_CONFIG = {
        'quest' : 60 * 12
    }
    
    return {
        tokenTimes : TIME_CONFIG,

        generateToken  : function(payload, secret, time){
            return Jwt.sign(
                payload,
                secret,
                // SSO_PRIVATE_CERT,
                {
                    algorithm: 'HS256',
                    expiresIn: time
                }
            );
        },

        verifyToken : function(token, key){
            return Jwt.verify(token, key);
        }
    }
}

module.exports = JWT_HELPER();



