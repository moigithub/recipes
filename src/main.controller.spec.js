var randomRecipe = {
			RecipeID: 123,
			Name: 'some food with name',
			Ingredients: ['one','two','three'],
			Preparation: 'big chunk of text',
			Category: ['pasta', 'postre'],
			Likes: 99,
			UserId: 'user11'
		};

describe('Main Controller', function(){
	var $controller;
	
	beforeEach(module('RecipeApp'));
	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}))
	it('shows a random recipe from top 100', function(){
		var scope = {};

		expect(scope.randomRecipe).toEqual(randomRecipe);

	})
});