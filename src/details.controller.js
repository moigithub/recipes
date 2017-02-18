angular.module('RecipeApp')
	.controller('DetailsController', function DetailsController($location, UserService, RecipeService, RecipeCoreService){
		var vm = this;

		vm.isLogged = UserService.isLogged;
		vm.getCurrentUser = UserService.getCurrentUser;

		var recipeID = $location.search().id;
		vm.elID = recipeID;

		vm.iLikeIt = false;


		RecipeCoreService.get({id:recipeID})
			.$promise.then(function(data){
				vm.result = data;

				//check if user is logged, and update iLikeIt flag
				if(vm.isLogged()){
					vm.iLikeIt = vm.result.likes.indexOf(vm.getCurrentUser().id) > -1;
				}
			})
			.catch(function(err){
				vm.errorMessage = "Error!";
			})


		vm.toggleLike = function(recipeId, userId){
			RecipeService.LikeRecipe(recipeId, userId)
				.then(function(recipe){
					vm.result = recipe;

					//check if user is logged, and update iLikeIt flag
					if(vm.isLogged()){
						vm.iLikeIt = vm.result.likes.indexOf(vm.getCurrentUser().id) > -1;
						console.log("toggle check", recipe, vm.getCurrentUser(), vm.iLikeIt);
					}
				})
				.catch(function(err){
					vm.errorMessage ="Error!";
				});
		}			

	})