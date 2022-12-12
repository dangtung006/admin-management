
const ORM_HELPER = function(){
    const mongoose = require('mongoose');

    const _startTransaction = async function(_session){
        try {
			if (_session) return _session;
			_session = await mongoose.startSession();
			_session.startTransaction();
			return _session;
		} catch(e) {
			logger.debug(`startTransaction: ${_session}`, e);
			throw new Error(e);
		}
    }

    
    const _commitTransaction = async function(_session){
        try {
			await _session.commitTransaction();
			return true;
		} catch(e) {
			logger.debug(`commitTransaction: ${_session}`, e);
			throw new Error(e);
		}
    }

    const _abortTransaction = async function(_session){
        try {
			await _session.abortTransaction();
			return true;
		} catch(e) {
			logger.debug(`abortTransaction: ${_session}`, e);
			throw new Error(e);
		}
    }

    const _closeTransaction = async function(_session){
        try {
			await _session.endSession();
			return true;
		} catch(e) {
			logger.debug(`closeTransaction: ${_session}`, e);
			throw new Error(e);
		}
    }

    return {
        getSchema : function(){
            return mongoose.Schema;
        },

        initModel : function(collection, schemaObj){
            mongoose.model(collection, schemaObj);
        },

        applyMiddlewares : function(schema, event, cb){
            schema.pre(event, cb);
        },

        getMongooseTypes : function(){
            return mongoose.Types
        },

        //
        initTransaction : async function(_process, _opts){
            if (config.useMongoSession != 1) return await _process(null, _opts);
            let _session = await _startTransaction();
            try {
                await _process(_session, _opts);
                await _commitTransaction(_session);
            } catch(e) {
                logger.debug(`processTransaction: ${_session}`, e);
                await _abortTransaction(_session);
                throw new Error(e);
            } finally {
                await _closeTransaction(_session);
            }
        }
    }
}

module.exports = ORM_HELPER;
