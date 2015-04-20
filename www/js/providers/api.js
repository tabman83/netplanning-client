;(function(angular, undefined) {

	angular.module('NetPlanningApp').factory('RequestService', function RequestService(md5){
		var secret = 'sVkJsK41#>P_GN?:y)]FPL~r?MV3`0x-!N{4J.X4`Xu87M-<.T:+??;el@yKU_73';
		var request = function request(config) {
			if(config.data) {
				config.headers['authorization'] = '';
		        config.headers['Signature'] = md5.createHash(JSON.stringify(config.data.params));
			}
		    return config;
		}

		return {
			request: request
		}
	})

	angular.module('NetPlanningApp').config(['$httpProvider', function($httpProvider) {
    	$httpProvider.interceptors.push('RequestService');
	}]);

	angular.module('NetPlanningApp').provider('Api', [function() {

		this.$get = function($http, $log, $window, md5) {

			function Api() {
				this.baseUrl = 'http://netplanning.thenino.net:50000/v1';
				//this.sid = localStorageService.get('sid');
			}

			Api.prototype.login = function (username, password) {
				//var hash = md5.createHash(params);
				return $http.post(this.baseUrl+'/login', {
					params: {
						username: password,
						password: password
					}
				});
			}

			return new Api();

		}

	}]);

})(angular);
