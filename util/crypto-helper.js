const crypto = require('crypto');
// 'use strict';

// const crypto = require('crypto');

// const ENCRYPTION_KEY = '721a1f6ab901a9e672634201f3cc685b'; // Must be 256 bytes (32 characters)
// const IV_LENGTH = 16; // For AES, this is always 16

// function encrypt(text) {
//   let iv = crypto.randomBytes(IV_LENGTH);
//   let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
//   let encrypted = cipher.update(text);

//   encrypted = Buffer.concat([encrypted, cipher.final()]);

//   return iv.toString('hex') + ':' + encrypted.toString('hex');
// }

// function decrypt(text) {
//   let textParts = text.split(':');
//   let iv = new Buffer(textParts.shift(), 'hex');
//   let encryptedText = new Buffer(textParts.join(':'), 'hex');
//   let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
//   let decrypted = decipher.update(encryptedText);

//   decrypted = Buffer.concat([decrypted, decipher.final()]);

//   return decrypted.toString();
// }

// module.exports = { decrypt, encrypt };
const CRYPTO_CONFIG = require('../configs/index');


module.exports = {
    // this.symestricAlgorithm      = 'aes-256-ctr';
    // this.securityPassword        = ConfigSecurity['MY_PRIVATE_STRING'];
    // this.passwordHashSecurityKey = ConfigSecurity['MY_PASSWORD_HASH'];

    symestricEncryptWithoutDB(message) {
        var cipher = crypto.createCipher(symestricAlgorithm, securityPassword);
        var crypted = cipher.update(message,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;

    },

    symestricDecryptWithoutDB(digest) {
        var decipher = crypto.createDecipher(symestricAlgorithm, securityPassword);
        var dec = decipher.update(digest,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    },

    symestricEncryptWithDB(message) {
        return new Promise((resolve, reject)=>{
            // loadData();
            // function loadData(){
            //     ModelSystemConfig
            //         .findOne()
            //         .exec()
            //         .then(handle)
            //         .catch(error);
            // }
            // function handle(data){
            //     if(!data) return error({ message: 'Invalid System Config' });
            //     if(!data.encrypt_public_key) return error({ message: 'Invalid System Config' });
                
            //     let encrypt_key   = data.encrypt_public_key + securityPassword;
            //     var cipher    = crypto.createCipher(symestricAlgorithm, encrypt_key);
            //     var crypted   = cipher.update(message,'utf8','hex');
            //     crypted       += cipher.final('hex');
            //     return response(crypted);
            // }
            // function response(data){ return resolve(data);}
            // function error(e){return reject(e);}
        })
    },

    symestricDecryptWithDB(digest) {
        // return new Promise((resolve, reject)=>{
        //     loadData();
        //     function loadData(){
        //         ModelSystemConfig
        //             .findOne()
        //             .exec()
        //             .then(handle)
        //             .catch(error);
        //     }
        //     function handle(data){
        //         if(!data) return error({ message: 'Invalid System Config' });
        //         if(!data.encrypt_public_key) return error({ message: 'Invalid System Config' });

        //         let encrypt_key   = data.encrypt_public_key + securityPassword;
        //         var decipher      = crypto.createDecipher(symestricAlgorithm, encrypt_key);
        //         var dec           = decipher.update(digest,'hex','utf8');
        //         dec               += decipher.final('utf8');
        //         return response(dec);
        //     }
        //     function response(data){ return resolve(data); }
        //     function error(e) { return reject(e);}
        // });
    },

    secureHash(message) {
        var hash = crypto.createHmac('sha512', securityPassword);
        hash.update(message);
        return hash.digest('hex');
    },

    passwordHash(message) {
        var hash = crypto.createHmac('sha512', passwordHashSecurityKey);
        hash.update(message);
        return hash.digest('hex');
    },

    encryptPassword(raw_pass, salt) {
        if (!raw_pass) return '';
        salt += securityPassword;
        try{
            return crypto
                    .createHmac('sha1', salt)
                    .update(raw_pass)
                    .digest('hex'); 
        }catch(err){
            return '';
        }
    },

    generateTimedToken(message) {
        return security.secureHash(new Date().toTimeString() + message);
    },

    makeSalt() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
}