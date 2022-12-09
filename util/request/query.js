const user = {
    getTestApi(){
        return { method : 'get', url : 'https://catfact.ninja/fact',  params : {} , headers : null  }
    }
}

const categoty = {

}

module.exports = {
    user,
    categoty
};
