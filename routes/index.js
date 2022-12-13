const { router }           = require("../init/my-app")();
const RouterAccount        = require('./account');
const RouterBook           = require('./books');
const { Handle, Render}    = require("../util/controller-helper");

router.use("/account" , RouterAccount);
router.use("/book" , RouterBook);

router.get('/',  function(req, res){
    return res.send("this is home page");
});

module.exports = router;