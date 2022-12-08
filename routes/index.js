const { router } = require("../init/my-app")();

router.get('/',  function(req, res){
    return res.send("this is home page")
});

module.exports = router;