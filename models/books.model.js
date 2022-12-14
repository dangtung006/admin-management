const { Schema , Types, initModel } = require("../util/orm-helper")();

const BookSchema = new Schema({
    name           : { type : String, default : ""},
    parent         : Types.ObjectId,
    publisher      : Types.ObjectId,
    authors        : [{ type : Types.ObjectId }],
    status         : { type   : Number, default : 1},
    created_at     : { type: Date, default: Date.now },
    updated_at     : { type: Date, default: Date.now },
    deleted_at     : { type: Date, default: null }
});

module.exports = initModel('books', BookSchema);