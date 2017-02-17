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

describe('search by user controller', function(){
	var  $httpBackend;
	var $scope, $routeParams, $q;
	var $controller, $rootScope, UserService;
	
	beforeEach(module('RecipeApp'));
	beforeEach(module('RecipeAPI'));
	beforeEach(inject(function(_$routeParams_, _UserService_,_$controller_, _$q_, _RecipeService_, _$rootScope_){
		$controller = _$controller_;
		$routeParams = _$routeParams_;
		UserService = _UserService_;
		$q = _$q_;
		RecipeService = _RecipeService_;
		$rootScope = _$rootScope_;
		///$scope = {};
		//mainController = $controller('MainController',{scope: scope});

		//_$controller_('MainController', {$scope: $scope, $location:$location, RecipeService: RecipeService})

	}));

	it('should have search results', function(){
		var fakeUser = {id:'123', displayName:'yoni'};

		spyOn(RecipeService, 'searchRecipeByUserId').and.callFake(function(){
			var defer = $q.defer();
			defer.resolve(results);
			return defer.promise;
		});

//		$location.path('/myRecipes/'+fakeUser.id);
		$routeParams.userid=fakeUser.id;
		var $this = $controller('SearchByUserController', {$routeParams:$routeParams, UserService:UserService, RecipeService: RecipeService});
		$rootScope.$apply();
	dump("test path",$routeParams);

		expect($this.results[0].Name).toBe(results[0].Name);
		expect($this.results[1].Name).toBe(results[1].Name);
		expect($this.results[2].Name).toBe(results[2].Name);
		//dump($this);
		expect(RecipeService.searchRecipeByUserId).toHaveBeenCalledWith('123');
	});

	it('should set query to currentuser name', function(){
		var fakeUser = {id:'234', displayName:'yoni'};

		spyOn(UserService, 'getCurrentUser').and.returnValue(fakeUser);

		spyOn(RecipeService, 'searchRecipeByUserId').and.callFake(function(){
			var defer = $q.defer();
			defer.resolve(results);
			return defer.promise;
		});
		
		//$location.search('userId',null);
		$routeParams.userid=null;
		var $this = $controller('SearchByUserController', {UserService:UserService, RecipeService: RecipeService});
		$rootScope.$apply();

		expect($this.results[0].Name).toBe(results[0].Name);
		expect($this.results[1].Name).toBe(results[1].Name);
		expect($this.results[2].Name).toBe(results[2].Name);
		//dump($this);
		expect($this.query).toBe(fakeUser.displayName);
		expect(RecipeService.searchRecipeByUserId).toHaveBeenCalledWith('234');
	});

	it('should set query to specified user name', function(){
		var fakeUser = {id:'456', displayName:'tutu'};
		
		spyOn(UserService, 'getUserById').and.callFake(function(){
			var defer = $q.defer();
			defer.resolve(fakeUser);
			return defer.promise;
		});

		spyOn(RecipeService, 'searchRecipeByUserId').and.callFake(function(){
			var defer = $q.defer();
			defer.resolve(results);
			return defer.promise;
		});


		//$location.search('userId',fakeUser.id);
		$routeParams.userid=fakeUser.id;
		var $this = $controller('SearchByUserController', { UserService:UserService, RecipeService: RecipeService});
		$rootScope.$apply();

		expect($this.results[0].Name).toBe(results[0].Name);
		expect($this.results[1].Name).toBe(results[1].Name);
		expect($this.results[2].Name).toBe(results[2].Name);
		//dump($this);
		expect($this.query).toBe(fakeUser.displayName);
		expect(RecipeService.searchRecipeByUserId).toHaveBeenCalledWith('456');
	});

	it('should handle the error', function(){
		spyOn(RecipeService, 'searchRecipeByUserId').and.callFake(function(){
			var defer = $q.defer();
			defer.reject();
			return defer.promise;
		});
		spyOn(UserService, 'getCurrentUser').and.returnValue(fakeUser);

		$routeParams.userid=fakeUser.id;
		var $this = $controller('SearchByUserController', { RecipeService: RecipeService});
		$rootScope.$apply();

		expect($this.errorMessage).toBe('Error!');
	});


})