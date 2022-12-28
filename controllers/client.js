
function ClientController(opt)  {

	const {
		client : ClientService,
        paymentMethod : PaymentMethodService
	} = opt;

	return {
        async getClientDetail(req, res){
            let client = await ClientService.getDetail(req.query.id);
            console.log("client : " , client);
            return client;
        },

		async handleAdd(req, res){
            let result = await ClientService.save(req.body);
            console.log("result : " , result);
		},
	
		async handleAddPaymentMethods(req, res){
            const {id, clientName , phone, cardId, note,  type } = req.body;

            let [
                client,
                payment
            ] = await Promise.all([
                ClientService.getById(id),
                PaymentMethodService.save({ clientName , phone, cardId, note,  type  }),
            ])
            
            client.paymentMethods.push(payment._id);
            let data = await client.save();
		},

        async addPaymentMethods(req, res){

        },
	
		async deleteOne(req, res){
			let id = req.query.id;
			let result = await ClientService.deleteById({ _id : id });
			return {
				result
			}
		}
	}
}

module.exports = ClientController;