
module.exports = {
    
    setEjsLayout : function(app, ejsLayouts){
        app.use(ejsLayouts);
    },

    setStaticFile :  function(app, express, url, path){
        app.use(url, express.static(__dirname + path));
    },

    setMasterRoute : function(app, url = '/', route){
        if(!route){
            return console.log("cant not find main-routes");
        }
        app.use(url, route);
    },  

    setSession : function(app, session){
        app.use(session({
            secret: "secret",
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,  // if true only transmit cookie over https
                httpOnly: false, // if true prevent client side JS from reading the cookie
                maxAge: 1000 * 60 * 1, // session max age in milliseconds
            },
        }));
    },

    setCompressReq : function(app, compression){
        app.use(compression({ 
            level : 6,
            threshold : 100 * 1000,
            filter    : (req, res)=>{
                if (req.headers['x-no-compression']) {
                    // don't compress responses with this request header
                    return false
                }
                // fallback to standard filter function
                return ModuleCompression.filter(req, res)
            }
        }));
    },

    parseBody :  function(app, express){
        app.use(express.json());
        app.use(express.urlencoded({extended : true}));
    },
    
    setHeaderProtection : function(app, helmet){
        app.use(helmet());
    },

    
    setCookie : function(app){
        var csrfProtection = ModuleCSRF({ cookie: true });
        global.csrfProtection = csrfProtection;
        app.use(ModuleCookieParser('My-Key'));
    },
    
    setAllowAccess : function(app){
        app.use(function(req, res, next){
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,POST');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        })
    }
}