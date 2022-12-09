
const LocalStrategy = require("passport-local").Strategy;
const File          = require("../util/file-helper");

module.exports = function(app, passport){
    
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done)=>{
        return done(null, user.email);
    });
    
    passport.deserializeUser(async (email, done)=>{
        try{
            let User = await File.loadObjsFromJsonDb("users", email);
            if(User.email == email) return done(null, email);
            return done(null, false);
        }catch(err){
            console.log("Authen Login Fail" , err);
            return done(null, false);
        }
    });

    passport.use(new LocalStrategy( async( username, password, done )=>{
        try{
            let User = await File.loadObjsFromJsonDb("users", username);
            if(User.email == username && User.password == password) return done(null, User);
            return done(null, false);
        }catch(err){
            console.log("Authen Login Fail" , err);
            return done(null, false);
        }
    }));
}