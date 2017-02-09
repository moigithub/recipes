angular.module('RecipeAPI',[])
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

		this.searchRecipe = function(query){
			var defer = $q.defer();
			$http.get('/recipes/search/'+query)
				.then(function(recipe){
					defer.resolve(recipe.data);
				})
				.catch(function(err){
					defer.reject();
				})
			return defer.promise;
		}

		this.searchRecipeById = function(id){
			var defer = $q.defer();
			$http.get('/recipes/searchById/'+id)
				.then(function(recipe){
					defer.resolve(recipe.data);
				})
				.catch(function(err){
					defer.reject();
				});
			return defer.promise;
		}

		this.searchRecipeByCateg = function(categ){
			var defer = $q.defer();
			$http.get('/recipes/searchByCateg/'+categ)
				.then(function(recipes){
					defer.resolve(recipes.data);
				})
				.catch(function(err){
					defer.reject();
				});
			return defer.promise;
		}

		this.getTop10 = function(){
			var defer = $q.defer();
			$http.get('/recipes/top10')
				.then(function(recipes){
					defer.resolve(recipes.data);
				})
				.catch(function(err){
					defer.reject();
				});
			return defer.promise;
		}

	})

	