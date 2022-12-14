const BookService    = require("../services/books.service");
const { renderUrl }  = require("../util/paging-helper");

module.exports = {

    async renderList(req, res) {

        let page              = req.query.page;
		let limit             = req.query.limit;
		page                  = page > 0 ? parseInt(page)   : 1;
		limit                 = limit > 0 ? parseInt(limit) : 10;

		let pagingUrl         = renderUrl('/book/list', {});
		let books             = await BookService.getList({page, limit});
		let total             = await BookService.countAll();

        return {
			pathView: 'book/index',
			pageData: {
				menuActive : "/book/list",
				pageTitle  : "Books",
				data       : {
					books            : books,
					numberPage       : Math.ceil(total/limit),
					pagingUrl        : pagingUrl,
					currentPage      : page,
					limit            : limit
				}
			}	
		}; 
    },

    async renderAdd(){

    },

    async renderEdit(){

    },

    async handleAdd(req, res){
    },

    async handleEdit(req, res){
    },

    async handleRemove(req, res){

    }
}