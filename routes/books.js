const  { router }      = require("../init/my-app")();
const BookHandler      = require("../controllers/book");

router.post("/create", BookHandler.create);
router.get("/list", BookHandler.renderList);

module.exports = router;