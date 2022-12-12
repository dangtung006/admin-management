module.exports = {
    toID36: function(id){
        alphabet = '0123456789abcdefghijklmnopqrstuvwxuz';
        length = alphabet.length;

        if(id == 0){
            return '0';
        }
        
        q = id;
        r = 0;
        ret = '';
        while(q !== 0){
            r = q % length;
            q = Math.floor(q/length);

            ret = alphabet[r] + ret;
        }

        return ret;
    },

    toID10: function(id){
        alphabet = '0123456789abcdefghijklmnopqrstuvwxuz';
        ret = 0;
        for(i=0; i < id.length; i++){
            ret += Math.pow(alphabet.length, id.length-i-1) * alphabet.indexOf(id[i]);
        }

        return ret;
    },

    genIDFromNumbers: function(prefix, A, B){
        max = Math.max(A,B);
        min = Math.min(A,B);

        return prefix + '_' + this.toID36(max) + '_' + this.toID36(min);
    },

    isUrl: function(url){
    	var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g;
    	var regex = new RegExp(expression);
    	if(url.match(regex)){
    		return true;
        }else{
    		return false;
        }
    },

    validateEmail: (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    createRandomString : ( length = 48 ) => {
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        let randomstring = '';
        for (var i=0; i<length; i++) {
            let rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }

        return randomstring
    },

    slugify: (str) => {
        str = str ? str.trim() : ""
       let slug = "";
       // Change to lower case
       let titleLower = str.toLowerCase();
       // Letter "e"
       slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
       // Letter "a"
       slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
       // Letter "o"
       slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
       // Letter "u"
       slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
       // Letter "i"
       slug = slug.replace(/i|í|ì|ĩ|ỉ|ị/gi, 'i');
       // Letter "d"
       slug = slug.replace(/đ/gi, 'd');
       // Trim the last whitespace
       slug = slug.replace(/\s*$/g, '');
       // Change whitespace to "-"
       slug = slug.replace(/\s+/g, '-');

       slug = slug.replace('.', '');
       slug = slug.replace('/', '');
       
       return slug;
    },

    numberToEnglish: (n, custom_join_character) => {

        var string = n.toString(),
            units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;
    
        var and = custom_join_character || '';
    
        /* Is number zero? */
        if (parseInt(string) === 0) {
            return 'zero';
        }
    
        /* Array of units as words */
        units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    
        /* Array of tens as words */
        tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Sighty', 'Ninety'];
    
        /* Array of scales as words */
        scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion', 'Septillion', 'Octillion', 'Nonillion', 'Decillion', 'Undecillion', 'Duodecillion', 'Tredecillion', 'Quatttuor-decillion', 'Quindecillion', 'Sexdecillion', 'Septen-decillion', 'Octodecillion', 'Novemdecillion', 'Vigintillion', 'Centillion'];
    
        /* Split user arguemnt into 3 digit chunks from right to left */
        start = string.length;
        chunks = [];
        while (start > 0) {
            end = start;
            chunks.push(string.slice((start = Math.max(0, start - 3)), end));
        }
    
        /* Check if function has enough scale words to be able to stringify the user argument */
        chunksLen = chunks.length;
        if (chunksLen > scales.length) {
            return '';
        }
    
        /* Stringify each integer in each chunk */
        words = [];
        for (i = 0; i < chunksLen; i++) {
    
            chunk = parseInt(chunks[i]);
    
            if (chunk) {
    
                /* Split chunk into array of individual integers */
                ints = chunks[i].split('').reverse().map(parseFloat);
    
                /* If tens integer is 1, i.e. 10, then add 10 to units integer */
                if (ints[1] === 1) {
                    ints[0] += 10;
                }
    
                /* Add scale word if chunk is not zero and array item exists */
                if ((word = scales[i])) {
                    words.push(word);
                }
    
                /* Add unit word if array item exists */
                if ((word = units[ints[0]])) {
                    words.push(word);
                }
    
                /* Add tens word if array item exists */
                if ((word = tens[ints[1]])) {
                    words.push(word);
                }
    
                /* Add 'and' string after units or tens integer if: */
                if (ints[0] || ints[1]) {
    
                    /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
                    if (ints[2] || !i && chunksLen) {
                        words.push(and);
                    }
    
                }
    
                /* Add hundreds word if array item exists */
                if ((word = units[ints[2]])) {
                    words.push(word + ' Hundred');
                }
    
            }
    
        }
    
        return words.reverse().join(' ');
    
    },

    convertPriceToNumber: (number) => {
        number = parseFloat(number)
        number = number.toFixed(2)
        let priceArr = number.split('.')

        let firstStr = common_utils.numberToEnglish(parseInt(priceArr[0])) + ' Dollars'
        let secondStr = priceArr[1] == '00' ? '' : common_utils.numberToEnglish(parseInt(priceArr[1])) + ' Cents'

        return (secondStr) ? firstStr + ' and ' + secondStr : firstStr
    },
}