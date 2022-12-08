const { router }           = require("../init/my-app")();
const RouterAccount        = require('./account');
const { Handle, Render}    = require("../util/handler-helper");

router.use("/account" , RouterAccount);

router.get('/',  function(req, res){
    return res.send("this is home page");
});

module.exports = router;