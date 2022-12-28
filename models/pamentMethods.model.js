const { Schema , Types, initModel } = require("../util/orm-helper")();

const PaymentMethodSchema = new Schema({
    clientName     : { type : String},
    phone          : { type : String},
    cardId         : { type : String},
    qr             : { type : String},
    note           : { type : String},
    type           : { type : Number},
    description    : { type : String },
    created_at     : { type : Date, default: Date.now },
    updated_at     : { type : Date, default: Date.now },
    deleted_at     : { type : Date, default: null }
});

module.exports = initModel('payment_methods', PaymentMethodSchema);