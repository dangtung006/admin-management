
function ProductController(opt)  {

	const {
		product : ProductService,
        pageRenderUrl,
		getResponse,
		makeValidate
	} = opt;

	return {
		async renderList(req, res) {
			let page              = req.query.page;
			let limit             = req.query.limit;
			page                  = page > 0 ? parseInt(page)   : 1;
			limit                 = limit > 0 ? parseInt(limit) : 10;

			// make service action :
			let products          = await ProductService.getList({ page, limit});
			let total             = await ProductService.countAll();

			console.log("products : " , products);
			
			//return response :
			// return getResponse('list' , {
			// 	// products         : products,
			// 	// numberPage       : Math.ceil(total/limit),
			// 	// pagingUrl        : pageRenderUrl('/product/list', {}),
			// 	// currentPage      : page,
			// 	// limit            : limit
			// });
		},
	
		async renderAdd(req, res){
	
		},
	
		async renderEdit(req, res){
	
		},
	
		async handleAdd(req, res){
			console.log(req.body);
			let product = await ProductService.save(req.body);
			console.log(product);
		},
	
		async handleEdit(req, res){
	
		},
	
		async remove(req, res){
	
		},
	}
}

module.exports = ProductController