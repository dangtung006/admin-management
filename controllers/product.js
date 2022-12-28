
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


			return {
				products         : products,
				numberPage       : Math.ceil(total/limit),
				currentPage      : page,
				limit            : limit
			}

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
			let { id, name, brand, code, description, specs} = req.body;

			let result = await ProductService.updateOne(
				{ _id : id }, 
				{name, brand, code, description, specs}
			);

			return {
				result : result.acknowledged
			}
		},
	
		async deleteOne(req, res){
			let id = req.query.id;
			let result = await ProductService.deleteById({ _id : id });
			return {
				result
			}
		},

		async search(req, res){
			let { k, v } = req.query;
			if(k == "bao_hanh") v = parseInt(v);
			let result = await ProductService.search( k, v );
			return {
				result
			}
		}
	}
}

module.exports = ProductController