module.exports = {
    wait : function(time){
        return new Promise((resolve, reject)=>{
            setTimeout(function(){ return resolve(true); }, time)
        });
    },

    getDateTime : function(){
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let d            = new Date()
        let curr_date    = d.getDate();
        let curr_month   = d.getMonth();
        let curr_year    = d.getFullYear();
    
        curr_date = (curr_date < 10) ? '0' + curr_date : curr_date;
        curr_year = curr_year.toString().substr(-2)
        return `${curr_date}-${monthNames[curr_month]}-${curr_year}`
    }
}