var fakeUser = {
	displayName : 'Moises',
	token: '54ghj4f6ghjf54h54'
};

describe('Auth Controller', function(){
	var $q, $controller, $this, UserService, $rootScope, $location;

	beforeEach(module('RecipeApp'));
	beforeEach(inject(function(_$q_, _$controller_, _UserService_, _$rootScope_, _$location_){
		$q = _$q_;
		$controller = _$controller_;
		UserService = _UserService_;
		$rootScope = _$rootScope_;
		$location = _$location_;
	}));

	it('set user variable', function(){
		spyOn(UserService, 'getUser').and.callFake(function(){
			var defer = $q.defer();
			defer.resolve(fakeUser);
			return defer.promise;
		});
		
		$this = $controller('AuthController',{UserService:UserService},{});
		$rootScope.$apply();
		expect($this.user).toEqual(fakeUser);
	});

	it('should redirect to /', function(){
		$location.path('/boo');
		dump($location.path());
		$this = $controller('AuthController',{UserService:UserService},{});
	//	$rootScope.$apply();
		expect($location.path()).toEqual('/');
	});


	it('set error message', function(){
		spyOn(UserService, 'getUser').and.callFake(function(){
			var defer = $q.defer();
			defer.reject(fakeUser);
			return defer.promise;
		})
		$this = $controller('AuthController',{UserService:UserService},{});
		$rootScope.$apply();
		expect($this.errorMessage).toEqual('Error!');
	});
});