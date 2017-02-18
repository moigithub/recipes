
describe('RecipeApi service', function(){
	describe('RecipeCoreApi', function(){
		var $httpBackend, RecipeCoreService;

		beforeEach(module('RecipeCoreAPI'));
		beforeEach(inject(function(_$httpBackend_, _RecipeCoreService_){
			$httpBackend = _$httpBackend_;
			RecipeCoreService = _RecipeCoreService_;
		}));

		afterEach(function(){
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('save data', function(){
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
			$httpBackend.expectGET('/recipes/1').respond(200);

			var recipe = RecipeCoreService.get({recipeId : 1});
			expect($httpBackend.flush).not.toThrow();
		});

		it('should update recipe with correct header token setted', function(){
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

		it('should authenticate request', function(){
			function checkHeaders(h){
			//	dump(h);
				// este test fallara xq el token debe ser dinamico por cada authenticated user
				//return angular.fromJson(h).authToken === 'my test token';

				return angular.fromJson(h).hasOwnProperty('authToken');
				//return true;
			}
			function checkUrl(u){
			//	dump("url:",u);
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

			$httpBackend.whenGET(checkUrl,checkHeaders).respond(200);
			$httpBackend.expectPOST(checkUrl,/./,checkHeaders).respond(200);
			$httpBackend.expectPUT(checkUrl,/./,checkHeaders).respond(200);
			$httpBackend.expectDELETE(checkUrl,checkHeaders).respond(200);

			RecipeCoreService.query();
			RecipeCoreService.get({recipeId : 1});
			new RecipeCoreService(recipe).$save();
			new RecipeCoreService(recipe).$update();
			new RecipeCoreService(recipe).$remove();

			expect($httpBackend.flush).not.toThrow();

		});
	});

});