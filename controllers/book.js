const BookService = require("../services/books.service");

module.exports = {

    async renderList(req, res) {
        return res.send("ok")
    },

    async create(req, res){
        console.log("qqqqq");
        let books = req.body;
        console.log("books : " , books);
        let name = BookService.getById();
        console.log("name : " , name);
        console.log("BookService : " , BookService);
    }
}