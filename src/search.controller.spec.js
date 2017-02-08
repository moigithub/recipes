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

describe('search controller', function(){
	var  $httpBackend;
	var $scope, $location, $q;
	var $controller, $rootScope;
	
	beforeEach(module('RecipeApp'));
	beforeEach(module('RecipeAPI'));
	beforeEach(inject(function(_$controller_, _$location_, _$q_, _RecipeService_, _$rootScope_){
		$controller = _$controller_;
		$q = _$q_;
		$location = _$location_;
		RecipeService = _RecipeService_;
		$rootScope = _$rootScope_;
		///$scope = {};
		//mainController = $controller('MainController',{scope: scope});

		//_$controller_('MainController', {$scope: $scope, $location:$location, RecipeService: RecipeService})

	}));

	it('should have search results', function(){
		spyOn(RecipeService, 'searchRecipe').and.callFake(function(){
			var defer = $q.defer();
			defer.resolve(results);
			return defer.promise;
		});

		$location.search('q','palta');
		var $this = $controller('SearchController', {$location:$location, RecipeService: RecipeService});
		$rootScope.$apply();

		expect($this.results[0].Name).toBe(results[0].Name);
		expect($this.results[1].Name).toBe(results[1].Name);
		expect($this.results[2].Name).toBe(results[2].Name);
		//dump($this);
		expect($this.query).toBe('palta');
		expect(RecipeService.searchRecipe).toHaveBeenCalledWith('palta');
	});

	it('should handle the error', function(){
		spyOn(RecipeService, 'searchRecipe').and.callFake(function(){
			var defer = $q.defer();
			defer.reject();
			return defer.promise;
		});

		var $this = $controller('SearchController', {$location:$location, RecipeService: RecipeService});
		$rootScope.$apply();

		expect($this.errorMessage).toBe('Error!');
	});


})