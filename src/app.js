
angular.module('RecipeApp',['ngRoute','RecipeAPI','UserServiceAPI','RecipeCoreAPI',
	'ui.materialize.carousel', 'ui.materialize.materialboxed','ui.materialize.modal','ui.materialize.sidenav'])
.config(function($routeProvider, $locationProvider, $provide){
/*
$provide.decorator('$sniffer', function($delegate) {
  $delegate.history = false;
  return $delegate;
});
*/


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
		.when('/myRecipes/:userid?',{
			controller: 'SearchByUserController',
			controllerAs : 'search',
			templateUrl: 'myRecipes.html'
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
			templateUrl: 'home.html',
	        // Add our redirection handler, normally this is used
	        // in otherwise routes, but we can co-opt it here
	        redirectTo: function(current, path, search){
	          if(search.goto){
	          	console.log("client",search.goto);
	            // if we were passed in a search param, and it has a path
	            // to redirect to, then redirect to that path
	            return  search.goto
	          }
	          else{
	            // else just redirect back to this location
	            // angular is smart enough to only do this once.
	            return "/"
	          }
	        }
		})
		.when('/authCheck',{
			controller: 'AuthController',
			controllerAs : 'auth',
			templateUrl: 'redir.html'
		})
		.otherwise({redirectTo:'/'});


		    $locationProvider.html5Mode({
	  enabled: true,
	  rewriteLinks: 'internal'
	});
	 $locationProvider.hashPrefix('!');

})
/*
.run(function($rootScope, $state, appInit) {
  $rootScope.$on('$stateChangeStart', function(e, to, toParams, from) {
	  if (from.name === "" && to.name !=== "main") {
	    e.preventDefault();
	    // Optionally set option.notify to false if you don't want 
	    // to retrigger another $stateChangeStart event
	    $state.go("\");
	  }
  });
});
*/