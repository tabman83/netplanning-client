angular.module('NetPlanningApp').controller('AppCtrl', function($scope, $rootScope, $ionicModal, $ionicActionSheet, $timeout, $http, $window, Api) {

    $scope.isLoaded = false;
    $scope.lastUpdate = undefined;
    $scope.errorDescription = '';
    $scope.credentials = {
        username: '',
        password: ''
    };

    // Create the delete modal that we will use later
    $ionicModal.fromTemplateUrl('templates/delete.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.deleteModal = modal;
    });

    var loginModal = null;
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        loginModal = modal;
    });

    $scope.doLogin = function() {
        $scope.errorDescription = '';
        Api.login($scope.credentials.username, $scope.credentials.password).success(function(result) {
            $scope.loadData();
            loginModal.hide();
        }).catch(function(result) {
            if(result.data) {
                $scope.errorDescription = result.data.message;
            } else {
                $scope.errorDescription = 'Cannot contact server.';
            }
        });
    }

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
            destructiveText: 'Log out',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            destructiveButtonClicked: function() {
                // log the user out then show login
                hideSheet();
                $scope.credentials.username = '';
                $scope.credentials.password = '';
                loginModal.show();
            }
        });
    }

    $scope.loadData = function() {
        $scope.isLoaded = true;
        /*
        $http.get('http://api.randomuser.me/').success(function(data) {
            var item = {
                id: Math.floor(Math.random() * (9000 - 5)) + 5,
                name: data.results[0].user.name.first.slice(0,1).toUpperCase()+data.results[0].user.name.first.slice(1) + ' ' + data.results[0].user.name.last.slice(0,1).toUpperCase()+data.results[0].user.name.last.slice(1),
                startDate: new Date(),
                endDate: new Date(),
                email: 'tabman83@gmail.com',
                type: 'recurring'
            }
            $scope.items.unshift(item);
            $scope.lastUpdate = Date.now();
        }).finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
       });*/
       Api.getLessons().success(function(result) {
           console.log(result);
           $scope.items = result.lessons;
           $scope.lastUpdate = result.lastCheck;
       }).catch(function(result) {
           console.log(result);
           if(result.status === 401) {
               loginModal.show();
               return;
           }
           if(result.status === 0) {
               // no internet connection
               return;
           }
           // server error
       }).finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.loadData();

});
