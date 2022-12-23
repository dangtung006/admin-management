const  { router }          = require("../init/my-app")();
const BookController       = require("../controllers/book");
const BaseRouter           = require("./base");

class BookRouter extends BaseRouter {
    constructor(){

        super({
            router : router
        })

        const { 
            renderList , 
            renderAdd 
        }                    = new BookController();

        this.router.get("/list", this.RenderWrapper(renderList));
        this.router.post("/create", this.RenderWrapper(renderAdd));
    }
}
module.exports = BookRouter