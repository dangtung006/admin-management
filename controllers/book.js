const BaseController = require("./base");

const viewConfigs    = {
	'list' : {
		pathView   : 'book/index',
		pageData   : {
			pageTitle : 'Books',
			pageJs    : [],
			pageTitle  : "Books"
		}
	},

	'getAdd' : {

	},

	'handleAdd' : {

	}
}

class BookController extends BaseController {
	constructor(){
		super({
			views : viewConfigs
		})
	}

	async renderList(req, res) {

        let page              = req.query.page;
		let limit             = req.query.limit;
		page                  = page > 0 ? parseInt(page)   : 1;
		limit                 = limit > 0 ? parseInt(limit) : 10;

		let books             = await BookService.getList({page, limit});
		let total             = await BookService.countAll();

		this.getResponse('list' , {
			books            : books,
			numberPage       : Math.ceil(total/limit),
			pagingUrl        : this.getPageingUrl('/book/list', {}),
			currentPage      : page,
			limit            : limit
		});

    }

    async renderAdd(req, res){

    }

    async renderEdit(req, res){

    }

    async handleAdd(req, res){

    }

    async handleEdit(req, res){

    }

    async remove(req, res){

    }
}

module.exports = BookController