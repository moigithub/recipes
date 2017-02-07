angular.module('RecipeApi')
	.service('RecipeService', function($http, $q){
		this.getRandomRecipe = function(){
			var defer = $q.defer();
			$http.get('/recipes/random')
				.then(function(recipe){
					defer.resolve(recipe.data);
				})
				.catch(function(err){
					defer.reject();
				})
			return defer.promise;
		}
	})
