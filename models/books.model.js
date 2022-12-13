const { Schema , Types, initModel } = require("../util/orm-helper")();

const BookSchema = new Schema({
    'name' : String,
    'parent' : Types.ObjectId
});

module.exports = initModel('books', BookSchema);