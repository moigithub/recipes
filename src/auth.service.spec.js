var user = {
	displayName : 'Moises',
	token: '54ghj4f6ghjf54h54'
};

describe('auth service', function(){
	var $this, $controller, $httpBackend;

	beforeEach(module('UserService'));
	beforeEach(inject(function(_$controller_, _$httpBackend_){
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
	}));

	it('check if user is authenticated', function(){
		$httpBackend.whenGET('/auth/user').respond(200, user);
		$this = $controller('AuthController', {},{});
		$httpBackend.flush();
		expect($this.user).toEqual(user);
	});
})