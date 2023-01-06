
function UserController(opt)  {

	const {
		user : UserService,
        pageRenderUrl,
		getResponse,
		makeValidate
	} = opt;

	return {
		async registerUser(req, res) {
            console.log(req.body);
		},
	
		async updateUserProfile(req, res){
	
		}
	}
}

module.exports = UserController