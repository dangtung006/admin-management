const {
    setEjsLayouts,
    setStaticFile,
    setSession,
    parseBody,
    setMasterRoute,
    setCompressReq,
    setHeaderProtection,
    setAllowAccess,
    setCSRFProtection,
    setFileManager
} = require('../middlewares/app-middleware');

const makeAuthenByPassport  = require("../middlewares/passport");


module.exports = {
    'port'           : 3000,
    'views_engine'   : 'ejs',
    'view_folder'    : 'views',
    'layout_folder'  : 'layouts/main',

    'master-route'   : setMasterRoute,
    'ejs_layouts'    : setEjsLayouts,
    'static_file'    : setStaticFile,
    'session'        : setSession,
    'body_parser'    : parseBody,
    'compress_req'   : setCompressReq,

    'file_manager'   : setFileManager,
    'file_url'       : '/logs/manager',
    'file_dir'       : '/logs',

    'passport'       : makeAuthenByPassport,
    'hide_header'    : setHeaderProtection,
    'CSRF_block'     : setCSRFProtection,
    'allow_access'   : {
        validOrigins : [ "http://localhost:3000" , "http://localhost:3001"],
        setAllowAccess
    },

    'app_local'   : {
        'pagingHelper' : require("../util/paging-helper")
    }

}