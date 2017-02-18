
angular.module('RecipeApp')
	.controller('NewRecipeController', function NewRecipeController($location, UserService, RecipeCoreService ){
		var vm = this;

		vm.save = function(){
			console.log(vm.form);
			console.log(vm.recipe);

			var newRecipe = new RecipeCoreService({
				name: vm.recipe.name,
				ingredients: vm.recipe.ingredients.split(","),
				preparation: vm.recipe.preparation,
				categories: vm.recipe.categories.split(","),
				likes: 0,
				photoUrl: vm.recipe.photoUrl,
				userId: UserService.getCurrentUser().id});
			
			newRecipe.$save(function(){
				//success
				$location.path("/myRecipes");
			});

		}


		vm.cancel = function(){
			vm.recipe={};
			$location.path("/myRecipes");
		}

	});

