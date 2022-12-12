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
    },

    getTimeByDays(timeStamp, days, direction) {
        if(direction== 'next') 
            return timeStamp + days * 24 * 60 * 60 * 1000;
        if(direction== 'prev') 
            return timeStamp - days * 24 * 60 * 60 * 1000; 
    },

    getTimestampStartOfDay(timestamp) {
        let start = new Date(timestamp);
        // start.setHours(0, 0, 0, 0);
        start.setUTCHours(0, 0, 0, 0);
        return start.getTime();
    },
    
    
    getTimestampEndOfDay(timestamp) {
        let end = new Date(timestamp);
        // end.setHours(23, 59, 59, 999);
        end.setUTCHours(23, 59, 59, 999);
        return end.getTime();
    },
    
    
    getTimestampMidOfDay(timestamp) {
        let mid = new Date(timestamp);
        //mid.setHours(12, 0, 0, 0);
        mid.setUTCHours(12, 0, 0, 0);
        return mid.getTime();
    },

    formartDateTimeExpect: (time) => {
        if (!time) return '';
        let d = new Date(time);
        let curr_date = d.getDate();
        let curr_month = d.getMonth() + 1;
        let curr_year = d.getFullYear();

        curr_date = (curr_date < 10) ? '0' + curr_date : curr_date;
        curr_month = (curr_month < 10) ? '0' + curr_month : curr_month;

        return `${curr_date}.${curr_month}.${curr_year}`;
    },

    formatDate: (time) => {
        try {
            if (!time) return '';
            let d = new Date(time);
            let curr_date = d.getDate();
            let curr_month = d.getMonth() + 1;
            let curr_year = d.getFullYear();

            curr_date = (curr_date < 10) ? '0' + curr_date : curr_date;
            curr_month = (curr_month < 10) ? '0' + curr_month : curr_month;

            return `${curr_date}/${curr_month}/${curr_year}`;
        } catch (err) {
            return ''
        }
    },

    getDate: (date_time) => {
        let date_of_regis = date_time.split('/')
        let day = date_of_regis[0]
        let month = date_of_regis[1] || ''
        let year = date_of_regis[2] ? date_of_regis[2].slice(-2) : ''

        return `${day}${month}${year}`
    }
}