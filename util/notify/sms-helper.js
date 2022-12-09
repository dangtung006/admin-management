const Nexmo = require('nexmo');

class SMS_HELPER {
    constructor(){
        this.nexmo = new Nexmo({
            apiKey: '',
            apiSecret: ''
        });

        this.BRAND_NAME = ''
        this.FROM = '';

    }

    requestCode(mobile){
        return new Promise((resolve, reject) => {
            this.nexmo.verify.request({number: mobile, brand: this.BRAND_NAME}, function(err, result) {
                if(err) { 
                    console.error(err)
                    reject(err)
                } else {
                    console.log('request_id', result)
                    let verifyRequestId = result.request_id
                    if (!verifyRequestId) {
                        return reject('Verify error')
                    }
                    resolve(verifyRequestId)
                }
            })
        })
    }

    sendCode(mobile, code){
        return new Promise((resolve, reject) => {
            let text = 'Demo code: ' + code
            nexmo.message.sendSms(this.FROM, mobile, text, (error, response) => {
                if(error) {
                    console.error(err)
                    reject(err)
                } else if(response.messages[0].status != '0') {
                    console.error(response);
                    reject('Nexmo returned back a non-zero status');
                } else {
                    console.log(response);
                    resolve(result)
                }
            })
        })
    }

    verifyCode(request_id, code){
        return new Promise((resolve, reject) => {
            this.nexmo.verify.check({request_id, code}, function(err, result) {
                if(err) { 
                    console.error(err)
                    reject(err)
                } else {
                    console.log('===== Verify =====', result, code)
                    if (result.error_text) {
                        return reject('Code verify invalid')
                    }
                    
                    resolve(result)
                }
            })
        })
    }
}

module.exports = SMS_HELPER;