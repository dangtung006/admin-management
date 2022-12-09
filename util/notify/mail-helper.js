const { google }     = require("googleapis");
const nodemailer     = require("nodemailer");

CLIENT_ID       = process.env.CLIENT_ID;
CLIENT_SECRET   = process.env.CLIENT_SECRET;
REDIRECT_URI    = process.env.REDIRECT_URI;
REFRESH_TOKEN   = process.env.REFRESH_TOKEN;

console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN);

class MAIL_HELPER {
    constructor(){
        this.oauth2Client = new google.auth.OAuth2( CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN );
        this.oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    }

    async makeTransporter(){
        const accessToken = await this.oauth2Client.getAccessToken();
        let transporter   = nodemailer.createTransport({
            service : "gmail",
            auth: {
                type: "OAuth2",
                user: "dangtung006@gmail.com",
                accessToken: accessToken,
                refreshToken : REFRESH_TOKEN,
                clientSecret : CLIENT_SECRET,
                clientId : CLIENT_ID,
            },
        });
        return transporter;
    }

    async sendMail(){
        try{
            const transporter = await this.makeTransporter();
            let result = await transporter.sendMail({
                from: "dangtung006@gmail.com",
                to: "language0512@gmail.com",
                subject: "Message title",
                text: "Plaintext version of the message",
                html: "<p>HTML version of the message</p>"
            });
            
            return result['response'];
        }
        catch(e){
            console.log("err : ", e);
        }
    }
}

module.exports = MAIL_HELPER;