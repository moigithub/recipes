angular.module('UserServiceAPI',[])
	.service('UserService', function($http, $q, $window){
		var vm=this;

		vm.user = {};

		vm.logout = function(){
			vm.user={};
			$window.localStorage.clear();
		}

		vm.isLogged=function(){
			return !!$window.localStorage.user;
		}	

		vm.getUser = function(){
			var defer = $q.defer();
			$http.get('/auth/user').then(function(user){
				vm.user = user.data;
console.log("auth service",user.data);
				if(vm.user)
					$window.localStorage.setItem('user', JSON.stringify(user.data));

				defer.resolve(user.data);

			})
			.catch(function(err){
				defer.reject();
			})

			return defer.promise;
		}
	});