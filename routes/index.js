const RouterAccount        = require('./account');
const { Handle, Render}    = require("../util/controller-helper");
const { router }           = require("../init/my-app")();


const RouterConfigs = {
    'book'  : require('./books')
}

class AppRouter {
    constructor(){
        this.appRouter  = router;
        
        for(let key in RouterConfigs ){
            this.appRouter.use(`/${key}`, new RouterConfigs[key]().router );
        }
    }
    
    // includeChildRoutes(){
    //     this.appRouter.use("/account", RouterAccount);
    //     this.appRouter.use("/book" , new BookRouter().router);
    // }

    // initMainRoute(){
    //     this.appRouter.get('/',  function(req, res){
    //         return res.send("this is home page");
    //     });
    // }

}   

module.exports = AppRouter;