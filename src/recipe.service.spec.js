
describe('Recipe Service', function(){
	var results= [
		{
			RecipeID: 123,
			Name: 'palta',
			Ingredients: ['one','two','three'],
			Preparation: 'big chunk of text',
			Category: ['pasta', 'postre'],
			Likes: 99,
			UserId: 'user11'
		},
		{
			RecipeID: 124,
			Name: 'some food with name2',
			Ingredients: ['one','naa','three'],
			Preparation: 'asdfsdf text',
			Category: ['sopas', 'carnes'],
			Likes: 99,
			UserId: 'user11'
		},
		{
			RecipeID: 125,
			Name: 'some food with name3',
			Ingredients: ['one','two','boo'],
			Preparation: '8i78i78j78 text',
			Category: ['bebida'],
			Likes: 99,
			UserId: 'user11'
		}
	];

	var oneRecipe = {
			RecipeID: 123,
			Name: 'some food with name',
			Ingredients: ['one','two','three'],
			Preparation: 'big chunk of text',
			Category: ['pasta', 'postre'],
			Likes: 99,
			UserId: 'user11'
		};

	var recipeAPI, $httpBackend;

		
		// var recipe = {
		// 	search: function(name){

		// 		return results;
		// 	}
		// };
		

		
		
		// angular.mock.module({
		// 	'RecipeApp' : {
		// 		search: function(name){
		// 			return results;
		// 		}
		// 	}			
		// });

		// angular.mock.module(function($provider){
		// 	$provider.factory('RecipeApp', function(){
		// 		return {
		// 			search: function(name){
		// 				return results;
		// 			}
		// 		}
		// 	})
		// })

		
	beforeEach(angular.mock.module('RecipeAPI'));

	beforeEach(	angular.mock.inject(function(_RecipeService_, _$httpBackend_){
			recipeAPI = _RecipeService_;
			$httpBackend = _$httpBackend_;
		})
	);


	it('get a random recipe', function(){
		
		$httpBackend.whenGET('/recipes/random').respond(200, oneRecipe);

		var recipe;
		recipeAPI.getRandomRecipe()
			.then(function(data){
				recipe = data;
			}
		);
		$httpBackend.flush();
		expect(recipe).toEqual(oneRecipe);

	});

	it('search recipes', function(){
		
		$httpBackend.whenGET('/recipes/search/palta').respond(200, oneRecipe);

		var recipe;
		recipeAPI.searchRecipe('palta')
			.then(function(data){
				recipe = data;
			}
		);
		$httpBackend.flush();
		expect(recipe).toEqual(oneRecipe);

	});
/*
	it('should search recipe by id', function(){
		$httpBackend.whenGET('/recipes/searchById/123').respond(200, oneRecipe);

		var recipe;
		recipeAPI.searchRecipeById('123')
			.then(function(data){
				recipe = data;
			});
		$httpBackend.flush();
		expect(recipe).toEqual(oneRecipe);
	});
*/
	it('should search recipe by category', function(){
		$httpBackend.whenGET('/recipes/searchByCateg/bebidas').respond(200, results);

		var recipe;
		recipeAPI.searchRecipeByCateg('bebidas')
			.then(function(data){
				recipe = data;
			});
		$httpBackend.flush();
		expect(recipe).toEqual(results);
	});

	it('should search recipe by user', function(){
		$httpBackend.whenGET('/recipes/user/123').respond(200, results);

		var recipe;
		recipeAPI.searchRecipeByUserId('123')
			.then(function(data){
				recipe = data;
			});
		$httpBackend.flush();
		expect(recipe).toEqual(results);
	});

	it('should get top 10 recipes', function(){
		$httpBackend.whenGET('/recipes/top10').respond(200, results);

		var recipe;
		recipeAPI.getTop10()
			.then(function(data){
				recipe = data;
			});
		$httpBackend.flush();
		expect(recipe).toEqual(results);
	});

/*
	it('should handle error', function(){
		$httpBackend.whenGET('/recipes/123').respond(500);

		var response;
		recipeAPI.searchRecipeById('123')
			.catch(function(error){
				response = "error";
			});
		$httpBackend.flush();
		expect(response).toEqual("error");

	});

*/
});
