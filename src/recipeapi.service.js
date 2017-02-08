
angular.module('RecipeCoreAPI', ['ngResource'])
	.service('RecipeCoreService', function($resource){
		return $resource('recipe/:recipeid',{recipeid: '@id'}, {
			update: {
				method: 'PUT',
				headers: {authToken: 'token'}
			}
		})
	})

	.factory('httpRequestInterceptor', function () {
	  return {
	    request: function (config) {
	    	//override the token
	      config.headers['authToken'] = 'my test token';
	      return config;
	    }
	  };
	})

	.config(function ($httpProvider) {
  		$httpProvider.interceptors.push('httpRequestInterceptor');
	});

