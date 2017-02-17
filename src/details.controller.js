angular.module('RecipeApp')
	.controller('DetailsController', function DetailsController($location, RecipeCoreService){
		var vm = this;

		var recipeID = $location.search().id;
		vm.elID = recipeID;

		RecipeCoreService.get({id:recipeID})
			.$promise.then(function(data){
				vm.result = data;
			})
			.catch(function(err){
				vm.errorMessage = "Error!";
			})
	})