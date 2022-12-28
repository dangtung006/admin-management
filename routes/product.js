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
            handleAdd

        }  = ProductController(this);

        this.router.get("/list", this.renderWrapper(renderList));
        this.router.post("/create", this.handleWraper(handleAdd));
    }
}

module.exports = BookRouter