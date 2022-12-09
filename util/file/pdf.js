const ejs             = require('ejs');
const path            = require('path');
const { getDateTime } = require("../date-time-helper");
const PDF             = require("html-pdf");

const RENDER_PDF =  {

    renderHtml(data, req) {
        return new Promise((resolve, reject) => {
            let pathFile = path.join(__dirname, '../views/pdfs/test.ejs');
            let urlBase  = `${req.protocol}://${req.get('host')}`
            let timePDF  = getDateTime();

            ejs.renderFile(pathFile, {
                data,
                urlBase,
                timePDF,
            }, function (err, result) {
                if (err) return reject(err)
                return resolve(result)
            })
        })
    },

    async renderPdf(data, req, res){
        let self = this;
        let html = await self.renderHtml(data, req);
        
        let options = { 
            format: 'A4',
            "footer": {
                "height": "28mm"
            }
        };

        let buffer = await PDF.create(html, options).toBuffer();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Test-detail.pdf");
        res.end(buffer, 'binary');
    }
}

module.exports = RENDER_PDF;