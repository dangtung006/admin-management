const LocalStrategy         = require('passport-local').Strategy;
const TwoFAStrategy         = require('passport-2fa-totp').Strategy;
const GoogleAuthenticator   = require('passport-2fa-totp').GoogeAuthenticator;
const ServiceUser           = require("../../services/user.service");

const localOpt  =  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback : false 
}

const twoFAOpt = {
    usernameField: "email",
    passwordField: "password",
    window: 1
}

const verifyEmailAndPasswordLocal = async function(email, password, done){
    try{
        const user = await  ServiceUser.getByEmail(email);
        if ( !user ) {
            return done( { message: 'User not found' }, false );
        }
        if ( !user.authenticate( password ) ) {
            return done( { message: 'Invalid password' }, false);
        } 

        let suser = {};
        suser.id = user._id;
        suser.email  = user.email;
        return done( null, suser );
    }
    catch(err){
        done(err);
    }
}

const verifyEmailAndPassword2Fa = async function(email, password, done){
    try{
        const user = await  ServiceUser.getByEmail(email);
        if ( !user ) {
            return done( { message: 'User not found' }, false );
        }
        if ( !user.authenticate( password ) ) {
            return done( { message: 'Invalid password' }, false);
        } 

        let suser = {};
        suser.id = user._id;
        suser.email  = user.email;
        suser.secret = user.secret;
        return done( null, suser );
    }
    catch(err){
        done(err);
    }
}

const verifyTotpCode = function(user, done){
    // 2nd step verification: TOTP code from Google Authenticator
        
    if (!user.secret) {
        done(new Error("Google Authenticator is not setup yet."));
    } else {
        // Google Authenticator uses 30 seconds key period
        // https://github.com/google/google-authenticator/wiki/Key-Uri-Format

        var secret = GoogleAuthenticator.decodeSecret(user.secret);
        // done(null, secret, 30);
        // user.secret = secret;
        done( null, secret, 30);
    }
}

module.exports  = {
    'local'    : new LocalStrategy(localOpt, verifyEmailAndPasswordLocal),
    '2fa-totp' : new TwoFAStrategy(twoFAOpt, verifyEmailAndPassword2Fa, verifyTotpCode)
}

