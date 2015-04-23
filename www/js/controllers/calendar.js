angular.module('NetPlanningApp').controller('CalendarCtrl', function($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('templates/day.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    $scope.open = function(items) {
        if(items.length) {
            $scope.details = items;
            $scope.modal.show();
        }
    }

});
