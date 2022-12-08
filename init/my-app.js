//Global Moudle :
const path = require('path');

// my module:
const configHelper = require("../util/configs/app");

const MY_APP = function(opt){

    // private
    const express     = require('express');
    const app         = express();

    //base midleware
    const session      = require('express-session');
    const cookieParser = require('cookie-parser');
    const ejsLayouts   = require('express-ejs-layouts');
    const compression  = require('compression');

    //securitymiddleware
    const helmet      = require('helmet');
    const csrf        = require('csurf');
    const passport    = require("passport");

    //you custom middle ware
    const masterRoute = require("../routes/index");


    const _initSecurity = function(){
        const [
            _hideHeader,
            _allowAccess,
            _setCSRFProtection
        ] = configHelper.find(['hide_header' , 'allow_access', 'CSRF_block']);

        const { validOrigins : _validOrigins ,  setAllowAccess : _setAllowAccess} = _allowAccess;

        _hideHeader(app, helmet);
        _setAllowAccess(app, _validOrigins);
        _setCSRFProtection(app, csrf, cookieParser);
    }

    const _initBaseMiddlewares = function (){
        const [
            _session,
            _bodyParser,
            _staticFile,
            _setCompress,
        ]  = configHelper.find(['session', 'body_parser', 'static_file', 'compress_req']);

        _session(app, session);
        _bodyParser(app, express);
        _setCompress(app, compression)
        _staticFile(app, express, 'public', 'public');
    }

    const _initAuthentication = function(){
        configHelper.findOne('passport')(app, passport);
    }

    const _initAppLocal = function(){
        let appLocal = configHelper.findOne("app_local");

        for(let key in appLocal) {
            app.locals[key] = appLocal[key];
        }
    };

    const _initViewEngineAndLayOut = function(){
        const [
            _viewEngine, 
            _viewFolder,
            _layoutFolder,
            _setEjsLayouts

        ] = configHelper.find(['views_engine', 'view_folder', 'layout_folder', 'ejs_layouts']);
            
        app.set('view engine', _viewEngine);
        app.set('views', path.join(__dirname, _viewFolder));
        app.set('layout', _layoutFolder);

        if(_viewEngine == 'ejs') {
            _setEjsLayouts(app, ejsLayouts);
        }
    };

    const _applyMiddleware = function(key){

        const middleware = configHelper.findOne(key); //for your own middleware and routes 

        switch(key){
            case 'master-route' :
                middleware(app, '/', masterRoute);
                break;
        }
    };

    //public
    return {

        app     : app,
        router  : express.Router(),

        run     : function(){

            _initSecurity();
            _initBaseMiddlewares();
            _initAuthentication();

            _initAppLocal();
            _initViewEngineAndLayOut();
            
            _applyMiddleware("master-route");

            const port   =  configHelper.findOne('port');
            const server = app.listen(port, ()=>{
                var _host = server.address().address;
                var _port = server.address().port;
                console.log("app listening at http://%s:%s", _host,  _port)
            });
        },

        applyHttpReq : function(url, method, handler, middlewares = null){
            switch(method){
                case 'get' : 
                    if(middlewares.length > 0) return app.get(url, ...middlewares, handler);
                    app.get(url, handler);
                    break;

                case 'post' :
                    if(middlewares.length > 0) return app.post(url, ...middlewares, handler);
                    app.post(url, handler);
                    break;
                    
                default: 
                    app.use(function(req, res){
                        return res.send("bad req")
                    })
            } 
        }
    }
}

module.exports = MY_APP;