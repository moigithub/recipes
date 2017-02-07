angular.module('RecipeApp',['RecipeAPI'])
	.controller('MainController', function MainController(RecipeAPIService, RecipeService){
		RecipeService.getRandom().then(function(recipe){
			$scope.randomRecipe = recipe;
		});
	});