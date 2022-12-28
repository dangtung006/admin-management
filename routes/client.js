const  { router }          = require("../init/my-app")();
const ClientController     = require("../controllers/client");
const ClientService        = require("../services/client.service");
const PaymentMethodService = require("../services/payment_methods.service");
const BaseRouter           = require("./base");


class ClientRouter extends BaseRouter {
    constructor(){

        super({
            router : router,
            services : {
                client : ClientService,
                paymentMethod : PaymentMethodService
            }
        })

        const { 
            getClientDetail,
            handleAdd,
            handleAddPaymentMethods
        }  = ClientController(this);

        this.router.get("/detail", this.handleWraper(getClientDetail));
        this.router.post("/create", this.handleWraper(handleAdd));
        this.router.post("/save/payment_method", this.handleWraper(handleAddPaymentMethods));
    }
}

module.exports = ClientRouter