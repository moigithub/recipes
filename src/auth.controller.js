angular.module('RecipeApp')
	.controller('AuthController', function(UserService, $location){
		var vm = this;

		vm.user = UserService.user;
		vm.isLogged = UserService.isLogged;



		UserService.logout();
		
		UserService.getUser()
			.then(function(data){
				var user={};
				if(data.hasOwnProperty('local')){
					user.displayName = data.local.email;
					user.id = data._id;
				} else if(data.hasOwnProperty('twitter')){
					user.displayName = data.twitter.displayName;
					user.id = data._id;
				} else if(data.hasOwnProperty('facebook')){
					user.displayName = data.facebook.name;
					user.id = data._id;
				} else if(data.hasOwnProperty('google')){
					user.displayName = data.google.name;
					user.id = data._id;
				}

				vm.user = user;
				console.log("authController", vm.user);
			})
			.catch(function(err){
				vm.errorMessage = "Error!";
			});

		$location.path('/');
	});