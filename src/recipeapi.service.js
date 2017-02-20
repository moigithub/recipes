
angular.module('RecipeCoreAPI', ['ngResource','UserServiceAPI'])
	.service('RecipeCoreService', function($resource, UserService){
		var token;	
		var user = UserService.getCurrentUser() ||{} ;
console.log("recipe core service options",user);
			if ( user.hasOwnProperty('keytoken')){
				token=user.keytoken 
			};		
			
		return $resource('/recipes/:recipeId',{recipeId: '@_id'}, {
			save: {
				method: 'POST'
				,headers: {'authToken': token}
			},
			remove: {
				method: 'DELETE'
				,headers: {'authToken': token}
			},
			delete: {
				method: 'DELETE'
				,headers: {'authToken': token}
			},
			update: {
				method: 'PUT'
				,headers: {'authToken': token}
			}
,		});
	});
/*	
	.factory('httpRequestInterceptor', function () {
,	//	var token = UserService.getCurrentUser().keyToken||undefined;
	  return {
	    request: function (config) {
	    	//override the token
	      config.headers['authToken'] = token;
	      return config;
	    }
	  };
	})

	.config(function ($httpProvider) {
  		$httpProvider.interceptors.push('httpRequestInterceptor');
	});

*/