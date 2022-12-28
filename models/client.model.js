const { Schema , Types, initModel } = require("../util/orm-helper")();

const ClientSchema = new Schema({
    name           : { type : String, default : ""},
    address        : { type: String },
    dateOfBirth    : { type : Date, default: Date.now },

    paymentMethods : [{ type : Types.ObjectId, ref : 'payment_methods'}],

    created_at     : { type : Date, default: Date.now },
    updated_at     : { type : Date, default: Date.now },
    deleted_at     : { type : Date, default: null }
});

module.exports = initModel('clients', ClientSchema);