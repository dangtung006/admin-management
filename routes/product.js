const  { router }          = require("../init/my-app")();
const ProductController    = require("../controllers/product");
const ProductService       = require("../services/product.service");
const BaseRouter           = require("./base");

const viewConfigs    = {
	'list' : {
		pathView   : 'product/index',
		pageData   : {
			pageTitle : 'Products',
			pageJs    : [],
			pageTitle : "Products"
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
                product : ProductService
            }
        })

        const { 
            renderList , 
            renderAdd ,
            handleAdd,
            handleEdit,
            deleteOne

        }  = ProductController(this);

        this.router.get("/list", this.handleWraper(renderList));
        this.router.get("/delete", this.handleWraper(deleteOne));
        this.router.post("/create", this.handleWraper(handleAdd));
        this.router.post("/edit", this.handleWraper(handleEdit));
    }
}

module.exports = BookRouter