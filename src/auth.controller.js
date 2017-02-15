angular.module('RecipeApp')
	.controller('AuthController', function(UserService, $location){
		var vm = this;

		vm.isLogged = UserService.isLogged;



		UserService.logout();
		
		UserService.getUser()
			.then(function(data){
				vm.user = data;
				//console.log("authController", vm.user, "data",data);
			})
			.catch(function(err){
				vm.errorMessage = "Error!";
			});

		$location.path('/');
	});