const { renderUrl }  = require("../util/paging-helper");

class BaseController {
    constructor(opt){
        this.views = opt.views;
        this.getPageingUrl = renderUrl
    }

    getResponse(key, data){
        return this.views[key].pageData.data = data;
    }

    makeValidateInput(params){
        
    }
}

module.exports = BaseController;