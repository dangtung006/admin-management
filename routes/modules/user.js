const  { router }            = require("../../init/my-app")();
const UserController         = require("../../controllers/user");
const UserService            = require("../../services/user.service");
const BaseRouter             = require("./base");


class UserRouter extends BaseRouter {
    constructor(){

        super({
            router : router,
            services : {
                user : UserService,
            }
        })

        const { 
            registerUser,
            updateUserProfile
        }  = UserController(this);

        this.router.post("/register", this.handleWraper(registerUser));
        this.router.post("/update", this.handleWraper(updateUserProfile));
    }
}

module.exports = UserRouter