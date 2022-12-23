const { Handle, Render}    = require("../util/controller-helper");

class BookRouter {
    constructor(opt){
        this.router          = opt.router;
    }

    handleWraper(cb){
        return Handle(cb);
    }

    RenderWrapper(cb){
        return Render(cb);
    }
}
module.exports = BookRouter