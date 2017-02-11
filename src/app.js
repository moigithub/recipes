
angular.module('RecipeApp',['ngRoute','RecipeAPI','ui.materialize.carousel', 'ui.materialize.materialboxed','ui.materialize.modal','ui.materialize.sidenav'])
.config(function($routeProvider){
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
		.when('/auth',{
			controller: 'AuthController',
			controllerAs : 'auth',
			templateUrl: 'home.html'
		})
		.otherwise({
			redirecTo: '/'
		})
});