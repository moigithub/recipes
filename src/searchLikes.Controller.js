angular.module('RecipeApp')
	.controller('SearchLikesController', 
		function SearchLikesController( $routeParams, $location, UserService, RecipeService, RecipeCoreService){
		var vm = this;
		vm.isLogged = UserService.isLogged;
//if no user specified.. get the logged user recipes

	//	var userId = $location.search().userId;

		if(!vm.isLogged()){
			$location.path('/');
		} 

		var userId = UserService.getCurrentUser().id;


		vm.query = "Recipes i Like";

		RecipeService.searchLikesRecipe(userId)
			.then(function(recipe){
				vm.results = recipe;
			})
			.catch(function(err){
				vm.errorMessage = "Error!";
			});


		vm.deleteRecipe=function(recipeId){
			console.log("delete recipe", recipeId);
			RecipeCoreService.delete({recipeId: recipeId},function(data){
				console.log("delete recipe",data);
				vm.results = vm.results.filter(function(r){return r._id !== recipeId});
			});
		}
		
		vm.getRecipe=function(recipeId){
			console.log("get recipe", recipeId);
			RecipeCoreService.get({recipeId: recipeId},function(data){
				console.log("get recipe",data);
			});
		}

	});
	