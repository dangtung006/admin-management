const { Schema , Types, initModel } = require("../util/orm-helper")();

const CateSchema = new Schema({
    name           : { type : String, default : ""},
    description    : { type : String, default : ""},
    status         : { type : Number, default : 1},
    children       : [{  type : Types.ObjectId, ref :"blog_categories"}],
    author         : { type : Types.ObjectId, ref: "authors" },
    
    created_at     : { type : Date, default: Date.now },
    updated_at     : { type : Date, default: Date.now },
    deleted_at     : { type : Date, default: null }
});

module.exports = initModel('blog_categories', CateSchema);