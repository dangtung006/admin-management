const  { router }            = require("../../init/my-app")();
const AuthorCardController   = require("../../controllers/author_cars");
const AuthorCardService      = require("../../services/author_card.service");
const BaseRouter             = require("./base");


class AuthorCardRouter extends BaseRouter {
    constructor(){

        super({
            router : router,
            services : {
                authorCard : AuthorCardService,
            }
        })

        const { 
            handleAdd
        }  = AuthorCardController(this);

        this.router.post("/create", this.handleWraper(handleAdd));
    }
}

module.exports = AuthorCardRouter