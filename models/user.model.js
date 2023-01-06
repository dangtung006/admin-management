const { Schema , Types, initModel } = require("../util/orm-helper")();
const bcrypt     = require("bcrypt");     

const UserSchema = new Schema({

    fullName        : { type: String },
    firstName       : { type: String },
    lastName        : { type: String },
    email           : { type: String, default: '', required: true},
    searchbleEmail  : { type: String, default: '', required: true, index: true },

    salt            : { type: String, required: true },
    hashedPassword  : { type: String, required: true },
    accountType     : { type: Number }, // 1: admin, //2 : sup-admin

    image           : { type: String },
    token           : { type: String },
    secret          : { type: String }, // Use for google authen
    status          : { type: Number, default: 1, required: true } // 0: deactive ; 1: Active, -1 delete
});

UserSchema
    .virtual('name')
    .set(function () {
        this.fullName = this.firstName + ' ' + this.lastName;
    })
    .get(function() {
        return this.fullName;
    });

UserSchema
    .virtual('password')
    .set(function(rawPass) {
        this.salt           = bcrypt.genSalt(10);
        console.log("this.salt : " , this.salt);
        this.hashedPassword = bcrypt.hash(rawPass, this.salt);
    });

module.exports = initModel('user', UserSchema);