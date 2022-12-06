
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

    parseBody :  function(app, express){
        app.use(express.json());
        app.use(express.urlencoded({extended : true}));
    }
}