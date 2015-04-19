angular.module('NetPlanningApp', ['ionic', 'ngResource', 'angularMoment', 'angular-md5']).run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

}).config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    }).state('app.next', {
        url: "/next",
        views: {
            menuContent: {
                templateUrl: "templates/next.html",
                controller: 'NextCtrl'
            }
        }
    }).state('app.new', {
        url: "/new",
        views: {
            menuContent: {
                templateUrl: "templates/new.html",
                controller: 'NewCtrl'
            }
        }
    }).state('app.cancelled', {
        url: "/cancelled",
        views: {
            menuContent: {
                templateUrl: "templates/cancelled.html",
                controller: 'CancelledCtrl'
            }
        }
    }).state('app.calendar', {
        url: "/calendar",
        views: {
            menuContent: {
                templateUrl: "templates/calendar.html",
                controller: 'CalendarCtrl'
            }
        }
    }).state('app.full-schedule', {
        url: "/full-schedule",
        views: {
            menuContent: {
                templateUrl: "templates/full-schedule.html",
                controller: 'FullScheduleCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/next');
});
