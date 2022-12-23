module.exports = {
    makeRandomInArray(){

    },
    
    makeRandomBetweenNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min) + '';
    },

    random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return parseInt(Math.floor(Math.random() * (max - min + 1)) + min); //The maximum is inclusive and the minimum is inclusive
    },

    randomByDigits(digits){
        let number = 10 ** parseInt(digits - 1);
        return Math.floor(number + Math.random() * number * 9);
    },

    generateRandomList(nums, min, max){
		if(min > max) 
			return false;
			
		if(quests > max ) 
			return false;
		
		tempArray = new Array(nums);
		for(i= 0; i < quests; i++) {
			let random = this.random(min, max);
			if (tempArray.indexOf(random) < 0){
				tempArray[i] = random;
			}else{
				i--;
			}
		}
		return tempArray;
	},
}