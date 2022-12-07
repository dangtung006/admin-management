module.exports = {
    isAuth : async function(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    }
}