angular.module('NetPlanningApp').controller('NextCtrl', function($scope, $rootScope, $http, $ionicModal) {

    $scope.delete = function(item) {
        console.log(item);
        $scope.deleteModal.show();
    }

});
