
angular.module('RecipeApp',['ngRoute','RecipeAPI','ui.materialize.carousel', 'ui.materialize.materialboxed'])
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
		.otherwise({
			redirecTo: '/'
		})
});