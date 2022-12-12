export default  {
	formatChartValue(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x = Math.floor(x * 10 ** decimals) / 10 ** decimals;
        x = parseFloat(x).toFixed(decimals);
        return x;
	},

	numberWithCommas(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x = Math.floor(x * 10 ** decimals) / 10 ** decimals;
        x = parseFloat(x).toFixed(decimals);
        x = parseFloat(x).toString();
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
	},

    numberWithCommasRoundUp(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x = Math.ceil(x * 10 ** decimals) / 10 ** decimals;
        x = parseFloat(x).toFixed(decimals);
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
    },

	roundDownFloat(value, decimals = 18) {
        return Math.floor(value * 10 ** decimals) / 10 ** decimals;
    },

    roundUpFloatNumber(x, decimals = 6) {
        if (isNaN(x) == true) x = 0;
        x = Math.ceil(x * 10 ** decimals) / 10 ** decimals;
        x = parseFloat(x).toFixed(decimals);
        x = parseFloat(x);
        return x;
	},

	roundDownFloatNumber(x, decimals = 6) {
		if (isNaN(x) == true) x = 0;
		x = parseInt(x * 10 ** decimals) / 10 ** decimals;
		x = parseFloat(x).toFixed(decimals);
		x = parseFloat(x);
		return x;
	},

    formatBigNumber (labelValue, decimals = 2) {
        return Math.abs(Number(labelValue)) >= 1.0e+12
            ? Math.round(Math.abs(Number(labelValue) / 1.0e+12) * 100) / 100 + "T"
            : Math.abs(Number(labelValue)) >= 1.0e+9
                ? Math.round(Math.abs(Number(labelValue) / 1.0e+9) * 100) / 100 + "B"
                : Math.abs(Number(labelValue)) >= 1.0e+6
                ? Math.round(Math.abs(Number(labelValue) / 1.0e+6) * 100) / 100 + "M"
                : Math.abs(Number(labelValue)) >= 1.0e+3
                    ? Math.round(Math.abs(Number(labelValue) / 1.0e+3) * 100) / 100 + "K"
                    : this.numberWithCommas(labelValue, decimals);
    },

    convertBigNumberToFloatNumber(_value, _decimals) {
        _value = _value.toString().trim();
        _value = _value.split("").reverse().join("");
        let _totalChar = _value.length;
        _totalChar = _totalChar >  _decimals ? _totalChar : _decimals + 1;
        let _r = '';
        // 0000123
        for (let idx = 0; idx < _totalChar; idx++) {
            let x = _value[idx] ? _value[idx] : 0;
            if (idx != _decimals) {
                _r += x;
            } else {
                _r += '.';
                _r += x;
            }
        }
        _r = _r.split("").reverse().join("");
        _r = parseFloat(_r);
        return _r;
    },

    convertPrice: (price) => {
        let priceArr = price.split('.')
        let priceInt = parseInt(priceArr[0]).toLocaleString()
        let priceSecond = priceArr[1] || ''
        return `${priceInt}.${priceSecond}`
    },

    convertPriceNumber: (price) => {
        if (!price) return ''
        price = parseFloat(price)
        price = price.toFixed(2)
        let priceArr = price.split('.')
        let priceInt = parseInt(priceArr[0]).toLocaleString()
        let priceSecond = priceArr[1] || ''
        return `${priceInt}.${priceSecond}`
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