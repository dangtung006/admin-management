const {
    setEjsLayout,
    setStaticFile,
    setSession,
    parseBody,
    setMasterRoute
} = require('../middlewares/app-middleware');


module.exports = {
    'port'           : 3000,
    'views_engine'   : 'ejs',
    'view_folder'    : 'views',
    'layout_folder'  : 'layouts/main',

    'ejs_layouts'    : setEjsLayout,
    'static_file'    : setStaticFile,
    'master-route'   : setMasterRoute,
    'session'        : setSession,
    'body_parser'    : parseBody,
}