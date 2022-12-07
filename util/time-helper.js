module.exports = {
    delay : function(time){
        return new Promise((resolve, reject)=>{
            setTimeout(function(){
                return resolve(true);
            }, time)
        });
    }
}