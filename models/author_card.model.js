const { Schema , Types, initModel } = require("../util/orm-helper")();

const AuthorCardSchema = new Schema({
    code           : { type : String},
    expires        : { type : String},
    status         : { type : Number, default : 1},

    created_at     : { type : Date, default: Date.now },
    updated_at     : { type : Date, default: Date.now },
    deleted_at     : { type : Date, default: null }
});

module.exports = initModel('author_cards', AuthorCardSchema);