
function AuthorCardController(opt)  {

	const {
		authorCard : AuthorCardService
	} = opt;

	return {
		async renderList(req, res) {
		},
	
		async handleAdd(req, res){
			console.log(req.body);
			let authorCard = await AuthorCardService.save(req.body);
			console.log(authorCard);
		},
	
		async handleEdit(req, res){

		},
	
		async deleteOne(req, res){
			let id = req.query.id;
			let result = await ProductService.deleteById({ _id : id });
			return {
				result
			}
		}
	}
}

module.exports = AuthorCardController