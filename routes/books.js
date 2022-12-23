const  { router }          = require("../init/my-app")();
const BookHandler          = require("../controllers/book");
const { Handle, Render}    = require("../util/controller-helper");


router.post("/create", BookHandler.handleAdd);
router.get("/list", BookHandler.renderList);

module.exports = router;