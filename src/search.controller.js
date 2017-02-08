
angular.module('RecipeApp')
	.controller('SearchController', function SearchController( $location, RecipeService){
		var vm = this;
		var query = $location.search().q;

		RecipeService.searchRecipe(query)
			.then(function(recipe){
				vm.results = recipe;
			})
			.catch(function(err){
				vm.errorMessage="Error!";
			});


	});
	