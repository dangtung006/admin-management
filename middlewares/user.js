module.exports = {
    isAuth : async function(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    },

    isLogined : function(req, res, next){
        if(!req.isAuthenticated()) return next();
        return res.redirect('/');
    },

    async isValidToken(req, res, next) {
		// try {
		// 	const _token = req.headers["x-access-token"];
		// 	const _decoded = jwt.verify(_token, config.privateKey);
		// 	if (!_decoded || !_decoded.id) {
        //         return RESPONSE_HELPER.APIResponseError(res, { message: 'AUTH_FALSE' });
		// 	}
		// 	const _user = await ServiceUser.getById({ id: _decoded.id });
		// 	if (!_user || _user.status != 1) {
		// 		return RESPONSE_HELPER.APIResponseError(res, { message: 'AUTH_FALSE' });
		// 	}
		// 	req.user = {
		// 		"id": _user._id,
		// 		"userName": _user.userName,
		// 		"email": _user.email
		// 	}
		// 	return next();
		// } catch(e) {
		// 	logger.log(e && e.message ? e.message : 'Please try again later.');
        //     return RESPONSE_HELPER.APIResponseError(res, { message: 'AUTH_FALSE' });
		// }
	},

    hasPermission : (req, res, next)=>{

    }
}