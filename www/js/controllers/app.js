angular.module('NetPlanningApp')

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $ionicActionSheet, $timeout, $http, $window) {

    $scope.isLoaded = false;
    $scope.lastUpdate = undefined;

    // Create the delete modal that we will use later
    $ionicModal.fromTemplateUrl('templates/delete.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.deleteModal = modal;
    });

    $scope.email = function(item){
        var link = [
            'mailto:',
            item.email,
            '?subject=NetPlanning lesson',
            '&body=Dear ',
            item.name,
            ',\n\nI\'m writing to you regarding your NetPlanning lesson scheduled for ',
            item.startDate,
            '.\n\nThe reason is:\n\nRegards,\nYour NetPlanning teacher.'
        ].join('');
        $window.location.href = decodeURI(link);
    }

    $scope.logout = function() {
        var hideSheet = $ionicActionSheet.show({
            titleText: 'Do you want to sign out ?',
            destructiveText: 'Sign out',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            destructiveButtonClicked: function() {
            }
        });
    }

    $scope.reload = function() {
        $scope.isLoaded = true;
        $http.get('http://api.randomuser.me/').success(function(data) {
            var item = {
                id: Math.floor(Math.random() * (9000 - 5)) + 5,
                name: data.results[0].user.name.first.slice(0,1).toUpperCase()+data.results[0].user.name.first.slice(1) + ' ' + data.results[0].user.name.last.slice(0,1).toUpperCase()+data.results[0].user.name.last.slice(1),
                startDate: new Date(),
                endDate: new Date(),
                email: 'tabman83@gmail.com',
                type: 'recurring'
            }
            $scope.items.push(item);
            $scope.lastUpdate = Date.now();
        }).finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
       });
    };


    $scope.items = [{
        id: 1,
        name: 'Samira Sedgwick',
        startDate: new Date(),
        endDate: new Date(),
        email: 'tabman83@gmail.com',
        type: 'recurring'
    }, {
        id: 2,
        name: 'Ronald Mcmickle',
        startDate: new Date(),
        endDate: new Date(),
        email: 'tabman83@gmail.com',
        type: 'recurring'
    }, {
        id: 3,
        name: 'Tiffani Tew',
        startDate: new Date(),
        endDate: new Date(),
        email: 'tabman83@gmail.com',
        type: 'recurring'
    }, {
        id: 4,
        name: 'Lilliam Larimore',
        startDate: new Date(),
        endDate: new Date(),
        email: 'tabman83@gmail.com',
        type: 'recurring'
    }];

});
