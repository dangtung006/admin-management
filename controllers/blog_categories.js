
function BlogCategoriesController(opt)  {

	const {
		blogCate : BlogCategoryService
	} = opt;

	return {
		async renderList(req, res) {
			return await BlogCategoryService.getBlogCateList();
		},
	
		async handleAdd(req, res){
			console.log(req.body);
			let blogCate = await BlogCategoryService.save(req.body);
			console.log(blogCate);
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

module.exports = BlogCategoriesController