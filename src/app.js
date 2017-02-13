
angular.module('RecipeApp',['ngRoute','RecipeAPI','UserServiceAPI',
	'ui.materialize.carousel', 'ui.materialize.materialboxed','ui.materialize.modal','ui.materialize.sidenav'])
.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode({
	  enabled: true,
	  rewriteLinks: 'internal'
	});

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