export default {
	sortArray(array, key, isAsc = true, isValueString = false) {
        array.sort(function(a, b){

            if (isValueString == true) {
                var valueA = a[key].toUpperCase();
                var valueB = b[key].toUpperCase();
                if (isAsc == true) {
                    if (valueA < valueB) {
                      return -1;
                    }
                } else {
                    if (valueB < valueA) {
                      return -1;
                    }
                }

            } else {
                if (isAsc == true) {
                    return a[key] - b[key] //sort by date ascending
                } else {
                    return b[key] - a[key] //sort by date ascending
                }
            }
        });
        return array;
    },
    sortArrayByDecimals(array ,num) {
        var result  = [];
        array.map(object=>{
            var start = object.price.indexOf('.');
            var objectPrice  = object.price.substr(parseInt(start) + 1, object.price.length);
            if(objectPrice.length == num ){
                result.push(object);
            }
        })
        return result;
    },
    getArrayByPageLimit( array, page, limit ) {
       var new_array = [];
       page = page ? parseInt( page ) : 1;
       limit= limit? parseInt( limit ): 20;
       for ( let i = 0; i < array.length; i++ ) {
           if ( i >= ( limit * ( page -1 ) ) && i < ( limit * page )  ) {
                new_array.push( array[ i ] );
           }
       }
       return new_array;
    },

    joinAndRemoveDupplicate(arr1, arr2) {
        let arr = [];
        let idx = 0;
        for (idx=0; idx<arr1.length; idx++) {
            arr.push(arr1[idx]);
        }
        for (idx=0; idx<arr2.length; idx++) {
            if (arr.indexOf(arr2[idx])<0) arr.push(arr2[idx]);
        }
        return arr;
    },

    joinArray(arr1, arr2) {
        let arr = [];
        let idx = 0;
        if (arr1) {
            for (idx=0; idx<arr1.length; idx++) {
                arr.push(arr1[idx]);
            }
        }
        if (arr2) {
            for (idx=0; idx<arr2.length; idx++) {
                arr.push(arr2[idx]);
            }
        }
        
        return arr;
    },

    arrayPushAll(items, addedItems) {
        if (addedItems) {
            for (idx=0; idx<addedItems.length; idx++) {
                items.push(addedItems[idx]);
            }
        }
        return items;
    },

    findItemByKey(arr, key, value) {
        for (let idx=0; idx<arr.length; idx++) {
            let item = arr[idx];
            if (item[key]==value) return item;
        }
        return null;
    }
}
