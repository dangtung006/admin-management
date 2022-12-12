const qrcode = require("qrcode");

class QrCode {
    constructor(){

    }
    
    async generateQrCodeUrl(secret){
        try{
            let url = await qrcode.toDataURL(secret);
            return url;
        }catch(e){
            
        }
    }
}
module.exports = QrCode;