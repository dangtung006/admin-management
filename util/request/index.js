const axios        = require('axios');
const querystring  = require('querystring');
const { user }     = require('./query');

class BaseRequest {
    
	constructor(opts) {
    }

    async makeRequest(method, url, params = {}, header = null, timeout = 3000){
        method = method.toLowerCase();
        let opts = { 
            "method": method, 
            "url": url
        }

        if ( header ) {
            opts.headers= header; 
        }   
        if ( method == 'get' ) {
            opts.params = params; 
        } else {
            opts.data = params; 
        }  

        if ( header && opts.data && header['Content-Type'] == 'application/x-www-form-urlencoded' ) {
            opts.data = querystring.stringify( opts.data ); 
        }

        try{
            let response = await axios( opts);
            return response.data;
        }catch(e){
            let message = err.message ? err.message : 'Something went wrong!';
            return message;
        }
    }

    async action( module, nameMethod ){
        if(module == 'user')  {
            if ( !user.hasOwnProperty(nameMethod) ) return await this.queryNotFound( nameMethod );
            const {method, url, params , headers} = user[nameMethod]();
            await this.makeRequest(method, url, params , headers);
        }
    }

    queryNotFound(name){
		return new Promise( ( resolve, reject ) => {
			return reject("[method not found]: " + name );
		})
	}

}

module.exports = BaseRequest;