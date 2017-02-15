/*
var fakeUser = {
  "_id": "123",
  "__v": 0,
  "facebook": {
    "email": "mcarlosman@live.com",
    "name": "Moises Man",
    "token": "adsfsadf",
    "id": "123123"
  }
};
*/
var fakeUser = {
		displayName: 'Moises Man',
		id:"123"
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

	it('set user varible', function(){
		spyOn(UserService, 'getUser').and.callFake(function(){
			var defer = $q.defer();
			defer.resolve(fakeUser);
			return defer.promise;
		});

		
		$this = $controller('AuthController',{UserService:UserService},{});
		$rootScope.$apply();
	//dump($this.user)
		expect($this.user).toEqual(fakeUser);
	});

	it('should redirect to /', function(){
		$location.path('/boo');
	//	dump($location.path());
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