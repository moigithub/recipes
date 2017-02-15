
angular.module('RecipeApp')
	.controller('NewRecipeController', function NewRecipeController( UserService, RecipeCoreService ){
		var vm = this;

		vm.save = function(){
			console.log(vm.form);
			console.log(vm.recipe);

			var newRecipe = new RecipeCoreService({
				name: vm.recipe.name,
				ingredients: vm.recipe.ingredients.split(","),
				preparation: vm.recipe.preparation,
				category: vm.recipe.categories.split(","),
				likes: 0,
				photoUrl: vm.recipe.photoUrl,
				userId: UserService.getCurrentUser().id});
			
			newRecipe.$save(function(){
				//success
			});
		}
	});

