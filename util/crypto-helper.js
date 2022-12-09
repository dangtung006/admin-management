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

module.exports = {
    
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

    generateTimedToken(message) {
        return security.secureHash(new Date().toTimeString() + message);
    },

    makeSalt() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
}