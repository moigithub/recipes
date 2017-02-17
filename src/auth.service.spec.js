var fakeUser = {
	id:"123",
	displayName:"Moises Man"
};

var expectedUser = {
	id:"123",
	displayName:"Moises Man"
};

describe('auth service', function(){
	var $this, $httpBackend, UserService, $window;

	beforeEach(module('UserServiceAPI'));
	beforeEach(inject(function(_$httpBackend_, _UserService_, _$window_){
		$httpBackend = _$httpBackend_;
		UserService = _UserService_;
		$window= _$window_;
	}));

	it('getUser should return user data', function(){
		$httpBackend.whenGET('/auth/user').respond(200, fakeUser);
		var user;
		UserService.getUser().then(function(data){
			user = data;
		});
		$httpBackend.flush();
		expect(user).toEqual(expectedUser);
	});

	it('getUserById should return user data', function(){
		$httpBackend.whenGET('/auth/user/123').respond(200, fakeUser);
		var user;
		UserService.getUserById('123').then(function(data){
			user = data;
		});
		$httpBackend.flush();
		expect(user).toEqual(expectedUser);
	});

	it('getCurrentUser should return saved data', function(){
		$httpBackend.whenGET('/auth/user').respond(200, fakeUser);
		var user;
		UserService.getUser().then(function(data){
			user = data;
		});
		$httpBackend.flush();
		expect(UserService.getCurrentUser()).toEqual(user);
	});

	it('getUser should save data on localstorage', function(){
		$httpBackend.whenGET('/auth/user').respond(200, fakeUser);
		var user;
		UserService.getUser().then(function(data){
			user = data;
		});
		
		spyOn($window.localStorage, 'setItem');

		$httpBackend.flush();
		expect(user).toEqual(expectedUser);
		expect(UserService.getCurrentUser()).toEqual(expectedUser);

		expect($window.localStorage.setItem).toHaveBeenCalled();
		expect(JSON.parse($window.localStorage.user).id).toEqual(expectedUser.id);
		expect(JSON.parse($window.localStorage.user).displayName).toEqual(expectedUser.displayName);
	});

	it('logout should clear storage n reset user variable', function(){
		spyOn($window.localStorage, 'clear').and.callThrough();
		UserService.logout();
		expect($window.localStorage.clear).toHaveBeenCalled();
		expect(UserService.getCurrentUser()).toEqual(null);
	});

	it('isLogged should return boolean value', function(){
		UserService.logout();
		expect(UserService.isLogged()).toEqual(false);
		$window.localStorage.user ='test';
		expect(UserService.isLogged()).toEqual(true);
	});



});