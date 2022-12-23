const RouterAccount        = require('./account');
const RouterBook           = require('./books');
const { Handle, Render}    = require("../util/controller-helper");
const { router }           = require("../init/my-app")();

class AppRouter {
    constructor(opt){
        this.appRouter  = router;
    }

    init(){
        this.initMainRoute();
        this.includeChildRoutes();
    }
    
    includeChildRoutes(){
        this.appRouter.use("/account" , RouterAccount);
        this.appRouter.use("/book" , RouterBook);
    }

    initMainRoute(){
        this.appRouter.get('/',  function(req, res){
            return res.send("this is home page");
        });
    }

}   

module.exports = AppRouter;