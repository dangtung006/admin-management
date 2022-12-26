const  { router }          = require("../init/my-app")();
const BookController       = require("../controllers/book");
const BookService          = require("../services/books.service");
const BaseRouter           = require("./base");

const viewConfigs    = {
	'list' : {
		pathView   : 'book/index',
		pageData   : {
			pageTitle : 'Books',
			pageJs    : [],
			pageTitle  : "Books"
		}
	},

	'getAdd' : {

	},

	'handleAdd' : {

	}
}

class BookRouter extends BaseRouter {
    constructor(){

        super({
            router : router,
            views : viewConfigs,
            services : {
                book : BookService
            }
        })

        const { 
            renderList , 
            renderAdd 

        }  = BookController(this);

        this.router.get("/list", renderList);
        this.router.post("/create", this.handleWraper(renderAdd));
    }
}
module.exports = BookRouter