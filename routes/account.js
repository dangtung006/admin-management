const  { router }      = require("../init/my-app")();
const  AccountHandler  = require("../controllers/account");

router.get("/list" , AccountHandler.renderAccountList);

module.exports = router;