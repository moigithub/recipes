angular.module('RecipeApp')
	.controller('SearchController', function SearchController( $location, RecipeService){
		var vm = this;

		vm.query = $location.search().q;
		RecipeService.searchRecipe(vm.query)
			.then(function(recipe){
				vm.results = recipe;
			})
			.catch(function(err){
				vm.errorMessage = "Error!";
			});

	});
	