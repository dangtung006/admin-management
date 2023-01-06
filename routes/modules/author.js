const  { router }            = require("../../init/my-app")();
const AuthorController       = require("../../controllers/author");
const AuthorService          = require("../../services/author.service");
const BaseRouter             = require("./base");


class AuthorRouter extends BaseRouter {
    constructor(){

        super({
            router : router,
            services : {
                author : AuthorService,
            }
        })

        const { 
            renderList,
            handleAdd
        }  = AuthorController(this);
        this.router.get("/list" , this.handleWraper(renderList))
        this.router.post("/create", this.handleWraper(handleAdd));
    }
}

module.exports = AuthorRouter