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

var randomRecipe = {
			RecipeID: 123,
			Name: 'palta',
			Ingredients: ['one','two','three'],
			Preparation: 'big chunk of text',
			Category: ['pasta', 'postre'],
			Likes: 99,
			UserId: 'user11'
		};

describe('Main Controller', function(){
	var  $q;
	var $rootScope, $location;
	var $controller;
	
	beforeEach(module('RecipeApp'));
//	beforeEach(module('RecipeAPI'));
	beforeEach(inject(function(_$controller_, _$location_, _$q_, _$rootScope_, _RecipeService_){
		$controller = _$controller_;
		$q = _$q_;
		$location = _$location_;
		$rootScope = _$rootScope_;
		RecipeService = _RecipeService_;
		//$scope = {};
		//mainController = $controller('MainController',{scope: scope});

		//_$controller_('MainController', {$scope: $scope, $location:$location, RecipeService: RecipeService})

	}));


/*
	it('gets a random recipe', function(){
		$httpBackend.whenGET('/recipes/random').respond(200, randomRecipe);
		$httpBackend.flush();

		expect($scope.randomRecipe).toEqual(randomRecipe);
	});

	it('redirect to query results page when search something', function(){
		$scope.query = 'palta';
		$scope.search();
		expect($location.url()).toBe('/recipes/search/palta');
	});
*/
	/* controllerAs syntax usando this*/
	it('gets a random recipe', function(){
		spyOn(RecipeService,'getRandomRecipe').and.callFake(function(){
			var defer = $q.defer();
			defer.resolve(randomRecipe)
			return defer.promise;
		});

		var $this = $controller('MainController', {$location:$location, RecipeService: RecipeService});
		$rootScope.$apply();
		//dump($this);
		expect($this.randomRecipe).toEqual(randomRecipe);
	});

	it('gets top10 recipes', function(){
		spyOn(RecipeService,'getTop10').and.callFake(function(){
			var defer = $q.defer();
			defer.resolve(results)
			return defer.promise;
		});

		var $this = $controller('MainController', {$location:$location, RecipeService: RecipeService});
		$rootScope.$apply();
		//dump($this);
		expect($this.top10).toEqual(results);
	});

	it('should handle errors', function(){
		spyOn(RecipeService,'getRandomRecipe').and.callFake(function(){
			var defer = $q.defer();
			defer.reject();
			return defer.promise;
		});

		var $this = $controller('MainController', {$location:$location, RecipeService: RecipeService});
		$rootScope.$apply();
		//dump($this);
		expect($this.errorMessage).toEqual("Error!");
	});
	
	it('redirect to query results page when search something', function(){
		var $this = $controller('MainController', {$location:$location, RecipeService: RecipeService},{query: 'palta'});
		$this.search();
		expect($location.url()).toBe('/recipes/search?q=palta');
	});	

	it('empty query should keep on same path', function(){
		var $this = $controller('MainController', {$location:$location, RecipeService: RecipeService},{query: ''});
		$this.search();
		expect($location.url()).toBe('');
	});	
});

