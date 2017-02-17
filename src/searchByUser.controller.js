angular.module('RecipeApp')
	.controller('SearchByUserController', 
		function SearchByUserController( $routeParams, $location, UserService, RecipeService, RecipeCoreService){
		var vm = this;

//if no user specified.. get the logged user recipes

	//	var userId = $location.search().userId;

		var userId = $routeParams.userid;
console.log("searchbyuser path", userId);
		if(!userId){

			var currUser = UserService.getCurrentUser();
console.log("search by user controller ,curruser", currUser, userId);
			if(currUser && currUser.hasOwnProperty('id')){
				userId = currUser.id;
				vm.query = currUser.displayName;
			}
			
		} else {
			UserService.getUserById(userId)
				.then(function(user){
console.log("getuserbyid searchbyuser controller",user);
					vm.query = user.displayName;
				})
				.catch(function(err){
				vm.errorMessage = "Error!";
			});
			
		}

		RecipeService.searchRecipeByUserId(userId)
			.then(function(recipe){
				vm.results = recipe;
			})
			.catch(function(err){
				vm.errorMessage = "Error!";
			});


		vm.deleteRecipe=function(recipeId){
			console.log("delete recipe", recipeId);
			RecipeCoreService.delete({id: recipeId},function(data){
				console.log("delete recipe",data);
				vm.results = vm.results.filter(function(r){return r._id !== recipeId});
			});
		}
		
		vm.getRecipe=function(recipeId){
			console.log("get recipe", recipeId);
			RecipeCoreService.get({id: recipeId},function(data){
				console.log("get recipe",data);
			});
		}

	});
	