
function BookController(opt)  {

	const {
		book : BookService,
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
			let books             = await BookService.getList({page, limit});
			let total             = await BookService.countAll();
			
			//return response :
			getResponse('list' , {
				books            : books,
				numberPage       : Math.ceil(total/limit),
				pagingUrl        : pageRenderUrl('/book/list', {}),
				currentPage      : page,
				limit            : limit
			});
	
		},
	
		async renderAdd(req, res){
	
		},
	
		async renderEdit(req, res){
	
		},
	
		async handleAdd(req, res){
	
		},
	
		async handleEdit(req, res){
	
		},
	
		async remove(req, res){
	
		},
	}
}

module.exports = BookController