
describe('RecipeApi service', function(){
	describe('RecipeCoreApi', function(){
		var $httpBackend, RecipeCoreService, UserService;

		beforeEach(module('RecipeCoreAPI'));
		beforeEach(inject(function(_$httpBackend_, _RecipeCoreService_, _UserService_){
			$httpBackend = _$httpBackend_;
			RecipeCoreService = _RecipeCoreService_;
			UserService = _UserService_;

		}));

		afterEach(function(){
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('save data', function(){
			spyOn(UserService, 'getCurrentUser').and.returnValue({ie:123,displayName:'yoni',keytoken:'token'});


			var expectedData = function(data){
	//			var postData = '{"_id":1,"Name":"some food with name","Ingredients":["one","two","three"],"Preparation":"big chunk of text","Category":["pasta","postre"],"Likes":99,"UserId":"user11"}';
				return angular.fromJson(data)._id === 1;
			}


			$httpBackend.expectPOST(/./, expectedData).respond(201);

			var newRecipe = new RecipeCoreService({
				_id: 1,
				name: 'some food with name',
				ingredients: ['one','two','three'],
				preparation: 'big chunk of text',
				category: ['pasta', 'postre'],
				likes: 99,
				photourl:'photo',
				userId: 'user11'});
			newRecipe.$save();

			expect($httpBackend.flush).not.toThrow();
		});

		it('get data with id', function(){
			spyOn(UserService, 'getCurrentUser').and.returnValue({ie:123,displayName:'yoni',keytoken:'token'});


			$httpBackend.expectGET('/recipes/1').respond(200);

			var recipe = RecipeCoreService.get({recipeId : 1});
			expect($httpBackend.flush).not.toThrow();
		});

		it('should update recipe with correct header token setted', function(){
			spyOn(UserService, 'getCurrentUser').and.returnValue({ie:123,displayName:'yoni',keytoken:'token'});


			var expectedData = function(data){
				//dump(data);
	//			var postData = '{"RecipeID":1,"Name":"some food with name","Ingredients":["one","two","three"],"Preparation":"big chunk of text","Category":["pasta","postre"],"Likes":99,"UserId":"user11"}';
				return angular.fromJson(data)._id === 1;
			}



			$httpBackend.expectPUT('/recipes/1', expectedData).respond(200);

			var newRecipe = new RecipeCoreService({
				_id: 1,
				name: 'some food with name',
				ingredients: ['one','two','three'],
				preparation: 'big chunk of text',
				category: ['pasta', 'postre'],
				likes: 99,
				photourl:'photo',
				userId: 'user11'});
			newRecipe.$update();

			expect($httpBackend.flush).not.toThrow();		
		});

		it('basic GET operation should work', function(){
			spyOn(UserService, 'getCurrentUser').and.returnValue({ie:123,displayName:'yoni',keytoken:'token'});


			function checkUrl(u){
				//dump("url:",u);
				return true;
			}
			var recipe = {
				_id: 1,
				name: 'some food with name',
				ingredients: ['one','two','three'],
				preparation: 'big chunk of text',
				category: ['pasta', 'postre'],
				likes: 99,
				photourl:'photo',
				userId: 'user11'};

			$httpBackend.whenGET(checkUrl).respond(200);

			RecipeCoreService.query();
			RecipeCoreService.get({recipeId : 1});

			expect($httpBackend.flush).not.toThrow();

		});

		it('write operation should authenticate request', function(){
			spyOn(UserService, 'getCurrentUser').and.returnValue({ie:123,displayName:'yoni',keytoken:'token'});

			function checkHeaders(h){
				//dump("headers",h);
				//return true;
				return angular.fromJson(h).hasOwnProperty('authToken');
			}
			function checkUrl(u){
				//dump("url", u);
				return true;
			}
			var recipe = {
				_id: 1,
				name: 'some food with name',
				ingredients: ['one','two','three'],
				preparation: 'big chunk of text',
				category: ['pasta', 'postre'],
				likes: 99,
				photourl:'photo',
				userId: 'user11'};

			$httpBackend.expectPOST(checkUrl,/./,checkHeaders).respond(200);
			$httpBackend.expectPUT(checkUrl,/./,checkHeaders).respond(200);
			$httpBackend.expectDELETE(checkUrl,checkHeaders).respond(200);

			new RecipeCoreService(recipe).$save();
			new RecipeCoreService(recipe).$update();
			new RecipeCoreService(recipe).$remove();

			expect($httpBackend.flush).not.toThrow();

		});
	});

});