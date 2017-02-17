angular.module('UserServiceAPI',[])
	.service('UserService', function($http, $q, $window){
		var vm=this;

		vm.logout = function(){
			$window.localStorage.clear();
		}

		vm.isLogged=function(){
			return !!$window.localStorage.user;
		}	

		vm.getCurrentUser = function(){
			var user = $window.localStorage.getItem('user');
			console.log(">>>>>> ",user);
			return user ? JSON.parse(user): null;
		}

		vm.getUser = function(){
			var defer = $q.defer();
			$http.get('/auth/user').then(function(data){
				var currentUser = data.data;
console.log("auth service", data);
				if(currentUser.id) {
					$window.localStorage.setItem('user', JSON.stringify(currentUser));
				}

				defer.resolve(currentUser);

			})
			.catch(function(err){
				defer.reject();
			})

			return defer.promise;
		}



		//TODO: getUserById
		vm.getUserById = function(userId){
			var defer = $q.defer();
			$http.get('/auth/user/'+userId).then(function(data){
				var user = data.data;
				defer.resolve(user);

			})
			.catch(function(err){
				defer.reject();
			})

			return defer.promise;
		}



	});