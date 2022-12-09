const crypto = require('crypto');

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