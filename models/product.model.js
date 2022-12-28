const { Schema , Types, initModel } = require("../util/orm-helper")();

const ProductSchema = new Schema({
    brand          : { type : String},
    code           : { type : String},
    name           : { type : String, default : ""},
    description    : { type : String},
    specs          : { type : Array, default : []}, //array of object key value [ { k : "" , v: ""}]
    status         : { type : Number, default : 1},
    
    created_at     : { type : Date, default: Date.now },
    updated_at     : { type : Date, default: Date.now },
    deleted_at     : { type : Date, default: null }
});

ProductSchema.index({ "specs.v" : 1, "spec.k" : 1});

module.exports = initModel('products', ProductSchema);