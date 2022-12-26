const { Handle, Render}    = require("../util/controller-helper");
const { renderUrl }        = require("../util/paging-helper");


class BaseRouter {
    constructor(opt){
        this.router          = opt.router;
        this.views           = opt.views;
        this.pageRenderUrl   = renderUrl;
        var services         = opt.services ? opt.services : {};

        for(let key in  services) {
            this[key]  = services[key];
        }
    }

    handleWraper(cb){
        return Handle(cb);
    }

    renderWrapper(cb){
        return Render(cb);
    }

    makeValidate(){
        console.log("validate book");
    }

    getResponse(key, data){
        return this.views[key].pageData.data = data;
    }
}
module.exports = BaseRouter;