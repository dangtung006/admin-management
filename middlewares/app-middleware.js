
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
                return compression.filter(req, res)
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

    
    setCSRFProtection : function(app, csrf, cookieParser){
        global.csrfProtection = csrf({ cookie: true });
        app.use(cookieParser('My-Key'));
    },
    
    setAllowAccess : function(app, validOrigins){
        app.use(function(req, res, next) {
            //set 1 origin 
            // res.header('Access-Control-Allow-Origin', "http://localhost:3001");

            // set multi origin 
            const origin = req.headers.origin;

            if (validOrigins.includes(origin)) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }

            res.header('Access-Control-Allow-Headers', "X-Requested-With, content-type, Accept");
            res.header('Access-Control-Allow-Methods', "GET, POST");
            res.header('Access-Control-Allow-Credentials', true);
            next();
        });
    }
}