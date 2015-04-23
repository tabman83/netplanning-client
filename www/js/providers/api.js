;(function(angular, undefined) {

	angular.module('NetPlanningApp').factory('SignInterceptor', function() {
		var secret = 'sVkJsK41#>P_GN?:y)]FPL~r?MV3`0x-!N{4J.X4`Xu87M-<.T:+??;el@yKU_73';
		var request = function request(config) {
	        config.headers['Signature'] = CryptoJS.HmacMD5(JSON.stringify(config.data || {}), secret);
		    return config;
		}

		return {
			request: request
		}
	})

	angular.module('NetPlanningApp').factory('AuthInterceptor', function($window){
		var request = function request(config) {
			config.headers['Authorization'] = 'Bearer '+$window.localStorage.getItem('authToken');
		    return config;
		}

		return {
			request: request
		}
	});

	angular.module('NetPlanningApp').config(['$httpProvider', function($httpProvider) {
    	$httpProvider.interceptors.push('SignInterceptor');
		$httpProvider.interceptors.push('AuthInterceptor');
	}]);

	angular.module('NetPlanningApp').provider('Api', function() {

		this.$get = function($http, $log, $q, $window) {

			function Api() {
				this.baseUrl = 'http://netplanning.thenino.net:50000/v1';
			}

			Api.prototype.login = function (username, password) {
				return $http.post(this.baseUrl+'/login', {
					username: username,
					password: password
				}).success(function(result) {
					$window.localStorage.setItem('authToken', result.authToken);
				});
			}

			Api.prototype.logout = function () {
				var deferred = $q.defer();
				$window.localStorage.removeItem('authToken');
				deferred.resolve(true);
				return deferred.promise;
			}

			Api.prototype.getLessons = function() {
				return $http.get(this.baseUrl+'/lessons');
			}

			return new Api();

		}

	});

})(angular);
