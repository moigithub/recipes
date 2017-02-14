
angular.module('RecipeApp')
	.controller('NewRecipeController', function NewRecipeController( UserService, RecipeUserService ){
		var vm = this;

		vm.save = function(){
			console.log(vm.form);
			console.log(vm.recipe);

			var newRecipe = new RecipeUserService({
				Name: vm.recipe.name,
				Ingredients: vm.recipe.ingredients.split(","),
				Preparation: vm.recipe.preparation,
				Category: vm.recipe.categories.split(","),
				Likes: 0,
				UserId: UserService.user._id});
			newRecipe.$save();
		}
	});

