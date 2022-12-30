const { Schema , Types, initModel } = require("../util/orm-helper")();

const BlogSchema = new Schema({
    title          : { type : String, default : ""},
    description    : { type : String, default : ""},
    slug           : { type : String, default : ""},
    cate           : { type : Types.ObjectId},
    author         : { type : Types.ObjectId},
    status         : { type : Number, default : 1},
    
    created_at     : { type : Date, default: Date.now },
    updated_at     : { type : Date, default: Date.now },
    deleted_at     : { type : Date, default: null }
});

module.exports = initModel('blogs', BlogSchema);