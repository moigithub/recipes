angular.module('RecipeApp')
	.controller('SearchByUserController', function SearchByUserController( $location, UserService, RecipeService){
		var vm = this;

//if no user specified.. get the logged user recipes

		var userId = $location.search().userId;
		if(!userId){
			var currUser = UserService.getCurrentUser();
			if(currUser && currUser.hasOwnProperty('id')){
				userId = currUser.id;
console.log("search by user controller ,curruser", currUser, userId)			;
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

	});
	