var fakeUser = {
	displayName : 'Moises',
	token: '54ghj4f6ghjf54h54'
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
		expect(user).toEqual(fakeUser);
	});

	it('getUser should return user data', function(){
		$httpBackend.whenGET('/auth/user').respond(200, fakeUser);
		var user;
		UserService.getUser().then(function(data){
			user = data;
		});
		
		spyOn($window.localStorage, 'setItem');

		$httpBackend.flush();
		expect(user).toEqual(fakeUser);
		expect(UserService.user).toEqual(fakeUser);

		expect($window.localStorage.setItem).toHaveBeenCalledWith('user',JSON.stringify(fakeUser));
		expect($window.localStorage.user).toEqual(JSON.stringify(fakeUser));
	});

	it('logout should clear storage n reset user variable', function(){
		spyOn($window.localStorage, 'clear');
		UserService.logout();
		expect($window.localStorage.clear).toHaveBeenCalled();
		expect(UserService.user).toEqual({});
	});

	it('isLogged should return boolean value', function(){
		UserService.logout();
		expect(UserService.isLogged()).toEqual(false);
		$window.localStorage.user ='test';
		expect(UserService.isLogged()).toEqual(true);
	});



});