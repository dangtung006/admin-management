const { Handle, Render}    = require("../../util/controller-helper");
const { renderUrl }        = require("../../util/paging-helper");


class BaseRouter {
    constructor(opt){
        const views          = opt.views;
        this.router          = opt.router;
        this.pageRenderUrl   = renderUrl;
        this.handleWraper    = Handle;
        this.renderWrapper   = Render;
        var services         = opt.services ? opt.services : {};

        for(let key in  services) {
            this[key]  = services[key];
        }

        this.makeValidate = function(){
            console.log("validate book");
        }

        this.getResponse  = function(key, data){
            views[key].pageData.data = data;
            return views[key];
        }
    }
}
module.exports = BaseRouter;