angular.module('NetPlanningApp').filter('groupByDay', function() {

    function memoize(func, hasher) {
        var memoize = function(key) {
            var cache = memoize.cache;
            var address = '' + (hasher ? hasher.apply(this, arguments) : key);
            if (!hasOwnProperty.call(cache, address)) {
                cache[address] = func.apply(this, arguments);
            }
            return cache[address];
        };
        memoize.cache = {};
        return memoize;
    };


    function groupByDay(previousValue, currentValue, index, array) {
        var m = moment(currentValue.begin);
        var key = m.format('YYYY-MM-DD');
        if( angular.isUndefined(previousValue[key]) ) {
            previousValue[key] = {
                items: [],
                date: currentValue.begin
            }
        }
        previousValue[key].items.push(currentValue);
        return previousValue;
    }


    return memoize(function(input) {
        if( angular.isArray(input) ) {
            return input.reduce( groupByDay, {} );
        } else {
            return [];
        }
    });

});
