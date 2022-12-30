
function AuthorController(opt)  {

	const {
		author : AuthorService
	} = opt;

	return {
		async renderList(req, res) {

            return await AuthorService.getAuthors();
			// make service action :
		},
	
		async handleAdd(req, res){
			console.log(req.body);
			let author = await AuthorService.save(req.body);
			console.log(author);
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

module.exports = AuthorController