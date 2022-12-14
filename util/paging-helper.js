module.exports = {
    renderUrl: function (root_url, query) {
        root_url += '?1=1';
        for (var key in query) {
            var value = query[key];
            if (value !== null) {
                root_url += '&' + key + '=' + value;
            }
        }
        return root_url;
    },
    renderPaging: function (url, pages, page) {
        if (pages === 0) {
            return '';
        }
        var concat_url = '?';
        if (url.indexOf('?') != -1) {
            concat_url = '&';
        }
        pages = Math.ceil(pages);
        page =  Math.ceil(page);
        var class_li = '';
        var output = '';

        var pre_page = (page -1)>0? (page-1):1;
        var next_page = page +1;
        if(page+1>pages){
            next_page = pages;
        }
        //console.log(' pre_page: '+ pre_page + ', next_page: '+next_page+ ', page: '+ page);
        if (page > pre_page) {
            output += '<li ><a class="prev" href="' + url + concat_url + 'page=' + (pre_page) + '">Pre</a></li>';
        }
        var from= (page-5)>0? (page-5):1;
        var to = from > 1 ? ((page+3)<=pages?(page+3):pages):((page+8)<=pages? (page+8): pages);

        if (page <= 9) {
            to = from + 8;
            to = to < pages ? to: pages;
        }

        for (var i = from; i <= to; i++) {

            class_li = '';
            if (i == page) {
                class_li = 'active';
            }

            output += '<li><a class="' + class_li + '" href="' + url + concat_url + 'page=' + (i) + '">' + i + '</a></li>';
        }
        if(to>pages){
            output+= ' <li>  <span>...</span> </li>';
            output += '<li><a  class="' + class_li + '" href="' + url + concat_url + 'page=' + pages + '">' + i + '</a></li>';
        }
        if (page < next_page) {
            output += '<li ><a class="next" href="' + url + concat_url + 'page=' + (next_page) + '">Next</a></li>';
        }
        return output;
    }
};