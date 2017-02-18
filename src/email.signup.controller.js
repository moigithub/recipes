
angular.module('RecipeApp')
	.controller('EmailSignupController', function EmailSignupController($location , UserService){
		var vm = this;

		console.log(vm.form);
		console.log(vm.data);


		vm.save = function(){
			UserService.registerEmail(vm.data)
				.then(function(){
					//saved

					$location.path('/');
				})
				.catch(function(){
					vm.errorMessage = "Error!";
				});
		}

		vm.cancel = function(){
			$location.path('/');
		}

	});

