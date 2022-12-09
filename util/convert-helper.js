const hexToDec	= require("hex-to-dec");

module.exports = {

    hexToNumber(data) {
        if (data == '0x') return 0;
        return hexToDec(data);
    },

    hexToAddress: function (data) {
      var address = "0x"+data.substring(24);
      return address;
    },
    
    splitEventLogData(data) {
		return data.match(/.{1,64}/g);
    }
}