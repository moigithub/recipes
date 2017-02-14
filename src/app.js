
angular.module('RecipeApp',['ngRoute','RecipeAPI','UserServiceAPI','RecipeCoreAPI',
	'ui.materialize.carousel', 'ui.materialize.materialboxed','ui.materialize.modal','ui.materialize.sidenav'])
.config(function($routeProvider, $locationProvider, $provide){
/*
$provide.decorator('$sniffer', function($delegate) {
  $delegate.history = false;
  return $delegate;
});
*/
    $locationProvider.html5Mode({
	  enabled: true,
	  rewriteLinks: 'internal'
	});
	 $locationProvider.hashPrefix('!');

	$routeProvider
		.when('/recipes/search',{
			controller: 'SearchController',
			controllerAs : 'search',
			templateUrl: 'results.html'
		})
		.when('/recipes/categ',{
			controller: 'SearchByCategController',
			controllerAs : 'search',
			templateUrl: 'results.html'
		})
		.when('/recipe/details',{
			controller: 'DetailsController',
			controllerAs : 'detail',
			templateUrl: 'details.html'
		})
		.when('/recipe/new',{
			controller: 'NewRecipeController',
			controllerAs : 'newRecipe',
			templateUrl: 'recipe.form.html'
		})
		.when('/',{
			controller: 'MainController',
			controllerAs : 'main',
			templateUrl: 'home.html'
		})
		.when('/authCheck',{
			controller: 'AuthController',
			controllerAs : 'auth',
			templateUrl: 'redir.html'
		})
		.otherwise('/');

});