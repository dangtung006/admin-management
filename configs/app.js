const {
    setEjsLayout,
    setStaticFile,
    setSession,
    parseBody,
    setMasterRoute,
    setCompressReq,
    setHeaderProtection,
    setAllowAccess,
    setCSRFProtection
} = require('../middlewares/app-middleware');


module.exports = {
    'port'           : 3000,
    'views_engine'   : 'ejs',
    'view_folder'    : 'views',
    'layout_folder'  : 'layouts/main',

    'master-route'   : setMasterRoute,
    'ejs_layouts'    : setEjsLayout,
    'static_file'    : setStaticFile,
    'session'        : setSession,
    'body_parser'    : parseBody,
    'compress_req'   : setCompressReq,

    'hide_header'    : setHeaderProtection,
    'CSRF_block'     : setCSRFProtection,
    'allow_access'   : {
        validOrigins : [ "http://localhost:3000" , "http://localhost:3001"],
        setAllowAccess
    }
}