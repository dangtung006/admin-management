const  { router }            = require("../../init/my-app")();
const BaseRouter             = require("./base");
const MainController         = require("../../controllers/main");

const viewConfigs = {
    'list' : {
        pathView: 'index',
        pageData: {
            menuActive : "/",
            pageTitle  : "Dashboard",
            pageJs     : [],
        }	
    }
}

class MainRouter extends BaseRouter {
    constructor(){

        super({
            router : router,
            views  : viewConfigs,
            services : {}
        });

        const { renderDashBoard } = MainController(this);

        this.router.get("/", this.renderWrapper(renderDashBoard));
    }
}

module.exports = MainRouter;