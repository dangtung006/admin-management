const  { router }          = require("../init/my-app")();
const BaseRouter           = require("./base");

class BookRouter extends BaseRouter {
    constructor(){

        super({
            router : router
        })

        this.router.get("/home", this.handleWraper(function(req, res, next){
            return {
                data : 'this is home page'
            }
        }));
    }
}
module.exports = BookRouter