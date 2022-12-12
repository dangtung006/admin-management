const Busboy = require('busboy');

class Uploads {
    constructor(opt){
        this.headers = opt.headers;
        this.busboy  = new Busboy({headers: opt.headers});
    }

    async UploadFile(req) {
        req.pipe(this.busboy);
        let data = await this.processUploadFile();
        return data;

    }

    async UploadImg(req){
        req.pipe(this.busboy);
        let data = await this.processUploadImg();
        return data; 
    }

    processUploadFile(){
        let filename;
        return new Promise((resolve, reject)=>{
            this.busboy.on('file', function (fieldname, file, nameImage, encoding, mimetype) {
                var date = new Date();
                var saveName = date.getTime();
                saveName += '-' + crypto.makeRandomBetweenNumber(0, 9999);
                if (mimetype === 'application/vnd.google-earth.kml+xml') {
                    saveName += saveName + '.' + 'kml';
                }
                if (mimetype === 'application/octet-stream') {
                    saveName += saveName + '.' + 'kml';
                }
                if (mimetype === 'text/xml') {
                    saveName += saveName + '.' + 'kml';
                }
                if (mimetype === 'application/vnd.google-earth.kmz') {
                    saveName += saveName + '.' + 'kmz';
                }
                if (mimetype === 'application/pdf') {
                    saveName += saveName + '.' + 'pdf';
                }
                var saveTo = path.join('media/uploads/', saveName);
                var copyTo = path.join(LINK_TO_WEB, saveName);
                file.pipe(fs.createWriteStream(saveTo));
                file.pipe(fs.createWriteStream(copyTo));
                filename = saveName;

            }).on('finish', function () {
                return resolve({ filename });
            });
        });
    }

    processUploadImg(){
        let filename;
        return new Promise((resolve, reject)=>{
            this.busboy.on('file', function (fieldname, file, nameImage, encoding, mimetype) {
                var date = new Date();
                var saveName = date.getTime();
                saveName += '-' + crypto.makeRandomBetweenNumber(0, 9999);
                if (mimetype === 'image/png') {
                    saveName += saveName + '.' + 'png';
                }
                if (mimetype === 'image/jpeg') {
                    saveName += saveName + '.' + 'jpg';
                }
                var saveTo = path.join('media/uploads/', saveName);
                var copyTo = path.join(LINK_TO_WEB, saveName);
                file.pipe(fs.createWriteStream(saveTo));
                file.pipe(fs.createWriteStream(copyTo));
                filename = saveName;

            }).on('finish', function () {
                return resolve({ filename });
            });
        });
    }

}

module.exports = Uploads;