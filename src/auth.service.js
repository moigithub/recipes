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
			console.log("auth.service::getCurrentUser >>>>>> ",user);
			return user ? JSON.parse(user): null;
		}

		vm.getUser = function(){
			var defer = $q.defer();
			$http.get('/api/user').then(function(data){
				var currentUser = data.data;
console.log("auth service::getUser", data);
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



		//TODO: registerEmail
		vm.registerEmail = function(userData){
			var defer = $q.defer();
                        
			$http.post('/auth/signup', userData)
				.then(function(data){
console.log("email signup success",data);
					defer.resolve(data.data);
				})
				.catch(function(err){
					defer.reject();
				});
			return defer.promise;
		}


		vm.getUserById = function(userId){
			var defer = $q.defer();
			$http.get('/api/user/'+userId).then(function(data){
console.log("auth.service::getUserById", data);
				var user = data.data;
				defer.resolve(user);

			})
			.catch(function(err){
				defer.reject();
			})

			return defer.promise;
		}



	});