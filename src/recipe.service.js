angular.module('RecipeAPI',['UserServiceAPI'])
	.service('RecipeService', function($http, $q, UserService){
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

		//toggle like: devuelve el recipe modificado
		this.LikeRecipe = function(id, userId){
			var defer = $q.defer();
			var options = {};
			var user = UserService.getCurrentUser() ||{} ;
console.log("PUT like options",options,user);
			if ( user.hasOwnProperty('keytoken')){
				options.headers= {
					"authToken":user.keytoken 
				}
			};
			$http.put('/recipes/Like/'+id,{userId:userId}, options) //options
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

		this.searchRecipeByUserId = function(userId){
			var defer = $q.defer();
			$http.get('/recipes/user/'+userId)
				.then(function(recipes){
					defer.resolve(recipes.data);
				})
				.catch(function(err){
					defer.reject();
				});
			return defer.promise;
		}

		this.searchLikesRecipe = function(userId){
			var defer = $q.defer();
			$http.get('/recipes/likes/'+userId)
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

	