//Global Moudle :
const path = require('path');

// my module:
const configHelper = require("../util/config");

const MY_APP = function(){

    //private
    const express     = require('express');
    const app         = express();
    const server      = require("http").createServer;
    
    const session     = require('express-session');
    const ejsLayouts  = require('express-ejs-layouts');

    const _initMiddlewares = function (){

        const [
            _session,
            _bodyParser,
            _staticFile,
        ]  = configHelper.find(['session', 'body_parser', 'static_file']);

        _session(app, session);
        _bodyParser(app, express);
        _staticFile(app, express, 'public', 'public');
    }

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

    // public 

    return {
        init   : function(){
            _initMiddlewares();
            _initViewEngineAndLayOut();
        },

        run  : function(){
            const port   =  configHelper.findOne('port');
            
            const server = app.listen(port, ()=>{
                var _host = server.address().address;
                var _port = server.address().port;
                console.log("app listening at http://%s:%s", _host,  _port)
            });
        },

        getApp : function(){
            return app;
        },

        getRouter : function(){
            return app.router();
        },

        getServer : function(){
            return server;
        },

        applyMiddleware(key){
            const middleware = configHelper.findOne(key); //for your own middleware and routes 
            switch(key){
                case 'master-route' :
                    middleware(app, '/', null);
                    break;
            }
        },

        applyHttpReq : function(url, method, handler, middlewares = null){
            switch(method){
                case 'get' : 
                    if(middlewares.length > 0) return app.get(url, ...middlewares, handler);
                    app.get(url, ...middlewares, handler);
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

module.exports = MY_APP();