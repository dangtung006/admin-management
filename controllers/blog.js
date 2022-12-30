
function BlogController(opt)  {

	const {
		blog : BlogService
	} = opt;

	return {
		async renderList(req, res) {
			// make service action :
		},
	
		async handleAdd(req, res){
			console.log(req.body);
            try{
                let blog = await BlogService.save(req.body);
                console.log(blog);
            }catch(e){
                console.log("errr : " , e);
            }
		},
	
		async handleEdit(req, res){
		},
	
		async deleteOne(req, res){
			let id = req.query.id;
			let result = await BlogService.deleteById({ _id : id });
			return {
				result
			}
		}
	}
}

module.exports = BlogController