angular.module('RecipeApp',[])
	.service('RecipeService', function($http, $q){
		this.search = function(name){
			var defer = $q.defer();
			$http.get('/search/recipes/'+name)
				.then(function(recipes){
					defer.resolve(recipes.data);
				})
				.catch(function(err){
					defer.reject();
				})
			return defer.promise;
		}
 
		this.searchById = function(recipeID){
			var defer = $q.defer();
			$http.get('/search/recipe/'+recipeID)
				.then(function(recipe){
					defer.resolve(recipe.data);
				})
				.catch(function(err){
					defer.reject();
				})
			return defer.promise;
		}
	})