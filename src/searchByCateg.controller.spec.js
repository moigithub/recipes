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

describe('search by categ controller', function(){
	var $location, RecipeService, $this, $rootScope, $controller, $q;

	beforeEach(module('RecipeApp'));
	beforeEach(module('RecipeAPI'));
	beforeEach(inject(function(_$location_, _RecipeService_, _$rootScope_, _$controller_, _$q_){
		$location = _$location_;
		RecipeService = _RecipeService_;
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$q = _$q_;
	}));

	it('should show results', function(){
		spyOn(RecipeService, 'searchRecipeByCateg').and.callFake(function(){
			var defer = $q.defer();
			defer.resolve(results);
			return defer.promise;
		});

		$location.search('name','bebidas');
		$this = $controller('SearchByCategController', {$location: $location, RecipeService:RecipeService},{});
		$rootScope.$apply();

		expect($this.results).toEqual(results);
		expect(RecipeService.searchRecipeByCateg).toHaveBeenCalledWith('bebidas');
	});
})