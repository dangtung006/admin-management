const  { router }        = require("../../init/my-app")();
const BlogController     = require("../../controllers/blog");
const BlogService        = require("../../services/blog.service");
const BaseRouter         = require("./base");


class BlogRouter extends BaseRouter {
    constructor(){

        super({
            router : router,
            services : {
                blog : BlogService,
            }
        })

        const { 
            handleAdd
        }  = BlogController(this);

        this.router.post("/create", this.handleWraper(handleAdd));
    }
}

module.exports = BlogRouter