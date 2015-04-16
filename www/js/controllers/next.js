angular.module('NetPlanningApp').controller('NextCtrl', function($scope, $rootScope, $http, $ionicModal) {

    $scope.items = [{
        id: 1,
        name: 'Samira Sedgwick',
        startDate: new Date(),
        endDate: new Date(),
        type: 'recurring'
    }, {
        id: 2,
        name: 'Ronald Mcmickle',
        startDate: new Date(),
        endDate: new Date(),
        type: 'recurring'
    }, {
        id: 3,
        name: 'Tiffani Tew',
        startDate: new Date(),
        endDate: new Date(),
        type: 'recurring'
    }, {
        id: 4,
        name: 'Lilliam Larimore',
        startDate: new Date(),
        endDate: new Date(),
        type: 'recurring'
    }];

    $scope.delete = function(item) {
        console.log(item);
        $scope.deleteModal.show();

        //deleteModal
    }

    $scope.doRefresh = function() {
        $rootScope.isLoaded = true;
        $http.get('http://api.randomuser.me/').success(function(data) {
            var item = {
                id: Math.floor(Math.random() * (9000 - 5)) + 5,
                name: data.results[0].user.name.first.slice(0,1).toUpperCase()+data.results[0].user.name.first.slice(1) + ' ' + data.results[0].user.name.last.slice(0,1).toUpperCase()+data.results[0].user.name.last.slice(1),
                startDate: new Date(),
                endDate: new Date(),
                type: 'recurring'
            }
            $scope.items.push(item);
        }).finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
       });
    };

});
