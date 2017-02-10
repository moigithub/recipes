
angular.module('RecipeApp')
	.controller('MainController', function MainController( $location, RecipeService){
		var vm = this;
		RecipeService.getRandomRecipe()
			.then(function(recipe){
				vm.randomRecipe = recipe;
			})
			.catch(function(err){
				vm.errorMessage ="Error!";
			});

		RecipeService.getTop10()
			.then(function(recipes){
				vm.top10 = recipes;
			})
			.catch(function(err){
				vm.errorMessage ="Error!";
			});

		vm.search = function(){
			if(vm.query){
				$location.path('/recipes/search').search('q',vm.query);
			}
		}

	});
	