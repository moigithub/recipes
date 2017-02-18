
angular.module('RecipeApp')
	.controller('EditController', function EditController($location, UserService, RecipeCoreService ){
		var vm = this;

		var recipeID = $location.search().id;

		RecipeCoreService.get({recipeId:recipeID})
			.$promise.then(function(data){
				vm.recipe = data;
				vm.recipe.categories = data.categories.join(",");
				vm.recipe.ingredients = data.ingredients.join(",");
			})
			.catch(function(err){
				vm.errorMessage = "Error!";
			})

		vm.save = function(){
			console.log(vm.form);
			console.log(vm.recipe);

			vm.recipe.userId = vm.recipe.userId._id;
			vm.recipe.$update({recipeId: vm.recipe._id},function(){
				//success
				$location.path("/myRecipes");
			});
		}

		vm.cancel=function(){
			$location.path("/myRecipes");
		}
	});

