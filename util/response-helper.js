//  const UtilLogger = require('./logger.util');

 const ResponseCode = {
     
    SUCCESS: "SUCCESS",
    BAD_REQUEST: "BAD_REQUEST",
    SERVER_ERROR: "SERVER_ERROR",
    INVALID_INPUT: "INVALID_INPUT",
    INVALID_SIGN: "INVALID_SIGN",
    END_ROUND_FINISH: "END_ROUND_FINISH",
    CURRENT_ROUND_NOT_FOUND: "CURRENT_ROUND_NOT_FOUND",
 
    APIResponseSuccess: (res, data = {}, msg = 'SUCCESS') => {
 
         return res.status(200).send({
             "code": ResponseCode.SUCCESS,
             "data": data
         });
    },
 
    APIResponseError: (res , error) => {
        let  message = (error.message)? error.message: 'Something went wrong!';
        //  UtilLogger.log(message, 'error', null, 'error');
        return res.status(200).send({
             "code": ResponseCode.SERVER_ERROR,
             "message": message
        });
    },
 
    RenderError: (res , error) => {
        let  message = (error.message)? error.message: 'Something went wrong!';
        //  UtilLogger.log(message, 'error', null, 'error');
        return res.status(200).send({
            "code": ResponseCode.SERVER_ERROR,
            "message": message
        });
    },
 
    functionResponse: (response) => {
         return {
             "code"      : response.code,
             "message"   : response.message ? response.message : '',
             "data"      : response.data
         };
    },
 };
 
 module.exports = ResponseCode;