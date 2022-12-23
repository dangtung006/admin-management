/*
* create by dangtung at 20/12/2022
*/
const passport              = require("passport");
const GoogleAuthenticator   = require('passport-2fa-totp').GoogeAuthenticator;
const ServiceUser           = require("../../services/user.service");
const AuthenStrategies      = require("./strategies.util");

const _applyAuthenStrategy  = function(authenStrategy){
    passport.use( authenStrategy , AuthenStrategies[authenStrategy]);
};

const _getAuthenStrategy    = function(){

    // if(config['environment'] == 'test'){
    //     return 'local';
    // } 
    // if(config['environment'] == 'development') {
    //     return '';
    // }
    
    return '2fa-totp'
};

const AuthenHelper = function(authenStrategy){

    if(!authenStrategy)
        logger.debug("don't apply authentication when development");


    return {

        initAuthentication: function(app){
            if(authenStrategy) {
                app.use(passport.initialize());
                app.use(passport.session());

                passport.serializeUser((user, done) => {
                    done( null, user.id );
                });
        
                passport.deserializeUser(async (id, done) => {
                    try {
                        let user = await ServiceUser.getById(id);
                        done(null, user);
                    } catch(err) {
                        done(err, null);
                    }
                });

                _applyAuthenStrategy(authenStrategy);
            }
        },

        appplyAuthenMiddleWare : function(req, res, next){
            if(authenStrategy) {
                //2fa-totp //local;
                return passport.authenticate(authenStrategy, function (err, user){
                    if (err) {
                        req.session.messages = err && err.message ? err.message : 'Sign-in unsuccessful. Please try again';
                        return res.redirect('/login');
                    }
                    if (!user) {
                        req.session.messages = 'That code was invalid. Please try again.';
                        return res.redirect('/login');	
                    }
                    req.session.messages = '';
                    req.logIn(user, function(err) {
                      if (err) { return next(err); }
                      return next();
                    });
                })(req, res, next);
            }
            return next();
        },

        generateAuthen2faData : function(email){
            return GoogleAuthenticator.register(email);
        },


        isAuthenticated(req, res, next) {
            if(!authenStrategy) return next();
            try {
                if (req.isAuthenticated()) {
                    return next();
                }
                res.redirect('/login');
            } catch(e) {
                logger.log(e && e.message ? e.message : 'Please try again later.');
                return res.redirect('/login');
            }
        },

        isLogined : function(req, res, next){
            
            if(!req.isAuthenticated()) return next();
            return res.redirect('/');
        },

        isApplyAuthen : function(){
            return authenStrategy != "";
        }

    }

}

const strategy      = _getAuthenStrategy();
module.exports      = AuthenHelper(strategy)
