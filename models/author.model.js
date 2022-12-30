const { Schema , Types, initModel } = require("../util/orm-helper")();

const BlogSchema = new Schema({
    name           : { type : String, required: true},
    address        : { type : String, default : ""},
    status         : { type : Number, default : 1},
    authorCard     : {type : Types.ObjectId, ref : "author_cards"},
    
    created_at     : { type : Date, default: Date.now },
    updated_at     : { type : Date, default: Date.now },
    deleted_at     : { type : Date, default: null }
});

module.exports = initModel('authors', BlogSchema);