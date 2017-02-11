angular.module('UserService',[])
	.controller('AuthController', function($http){
		var vm=this;
		$http.get('/auth/user').then(function(user){
			vm.user = user.data;
		})
	});