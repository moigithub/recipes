angular.module('RecipeApp')
	.controller('DetailsController', function DetailsController($location, RecipeService){
		var vm = this;

		var recipeID = $location.search().id;
		vm.elID = recipeID;
		RecipeService.searchRecipeById(recipeID)
			.then(function(data){
				vm.result = data;
			})
			.catch(function(err){
				vm.errorMessage = "Error!";
			})
	})