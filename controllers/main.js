
function MainController(opt)  {

	const {
		getResponse
	} = opt;


	return {
		async renderDashBoard(req, res) {
			//return response :
			return getResponse('list' , {});
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

module.exports = MainController