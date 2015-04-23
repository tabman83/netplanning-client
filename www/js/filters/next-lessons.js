angular.module('NetPlanningApp').filter('nextLessons', function() {

    return function(input) {
        if( angular.isArray(input) ) {
            return input.slice(0, 5);
        } else {
            return [];
        }
    }

});
