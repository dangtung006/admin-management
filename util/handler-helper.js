const UtilResponse = require('./response-helper');
// const UtilLogger   = require('../../utils/logger.util');

module.exports = {
    Handle(controllerHandle) {
        return async (req, res, next) => {
            try {
                
                let data = await controllerHandle(req, res, next);

                if(data && data.redirectUrl) return res.redirect(data.redirectUrl);

                if (data == null) return UtilResponse.APIResponseSuccess(res);

                if (data) return UtilResponse.APIResponseSuccess(res, data);

            } catch (err) {
                // console.log(err);
                // UtilLogger.log(err && err.message ? err.message : 'Please try again later.', 'error', null, 'error', 'System Error');
                return UtilResponse.APIResponseError(res, err);
            }
        };
    },

    Render(controllerRender) {
        return async (req, res, next) => {
            try {
                let data = await controllerRender(req, res, next);
                if (!data) return UtilResponse.RenderError(res);
                if(data.redirectUrl) return res.redirect(data.redirectUrl);
                let { pathView, pageData } = data;
                return res.render(pathView, pageData);
            } catch (err) {
                // UtilLogger.log(err && err.message ? err.message : 'Please try again later.', 'error', null, 'error', 'System Error');
                return UtilResponse.RenderError(res, err);
            }
        };
    }
}
