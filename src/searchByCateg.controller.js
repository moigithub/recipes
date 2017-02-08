angular.module('RecipeApp')
	.controller('SearchByCategController', function($location, RecipeService){
		var vm = this;

		vm.query = $location.search().name;
		RecipeService.searchRecipeByCateg(vm.query)
			.then(function(recipes){
				vm.results = recipes;
				console.log(vm);
			})
			.catch(function(err){
				vm.errorMessage = "Error!";
			})
	});