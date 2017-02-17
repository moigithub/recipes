var recipe= {
			RecipeID: 123,
			Name: 'palta',
			Ingredients: ['one','two','three'],
			Preparation: 'big chunk of text',
			Category: ['pasta', 'postre'],
			Likes: 99,
			UserId: 'user11'
		};

describe('details controller', function(){
	var $location, $controller, RecipeService, $this, $rootScope, $q;

	beforeEach(module('RecipeApp'));
	beforeEach(module('RecipeAPI'));

	beforeEach(inject(function(_$location_, _$controller_, _RecipeService_, _$rootScope_, _$q_){
		$location = _$location_;
		$controller = _$controller_;
		RecipeService = _RecipeService_;
		$rootScope = _$rootScope_;
		$q = _$q_;
	}))
/*
	it('should search data for specific recipe id', function(){
		spyOn(RecipeService, 'searchRecipeById').and.callFake(function(){
			var defer = $q.defer();
			defer.resolve(recipe);
			return defer.promise;
		});

		$location.search('id','123');
		$this = $controller('DetailsController', {$location: $location, RecipeService: RecipeService},{});
		$rootScope.$apply();

		//dump($this);
		expect($this.result).toEqual(recipe);
		expect(RecipeService.searchRecipeById).toHaveBeenCalledWith('123');
	});

	it('should handle error', function(){
		spyOn(RecipeService, 'searchRecipeById').and.callFake(function(){
			var defer = $q.defer();
			defer.reject();
			return defer.promise;
		});

		$location.search('id','123');
		$this = $controller('DetailsController', {$location: $location, RecipeService: RecipeService},{});
		$rootScope.$apply();

		
		expect($this.errorMessage).toEqual('Error!');
		
	});
*/
})