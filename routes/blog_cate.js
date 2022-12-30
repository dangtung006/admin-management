const  { router }            = require("../init/my-app")();
const BlogCateController     = require("../controllers/blog_categories");
const BlogCateService        = require("../services/blog_cate.service");
const BaseRouter             = require("./base");


class BlogCateRouter extends BaseRouter {
    constructor(){

        super({
            router : router,
            services : {
                blogCate : BlogCateService,
            }
        })

        const { 
            renderList,
            handleAdd
        }  = BlogCateController(this);

        this.router.post("/create", this.handleWraper(handleAdd));
        this.router.get("/list", this.handleWraper(renderList));
    }
}

module.exports = BlogCateRouter