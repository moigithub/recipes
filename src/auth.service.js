angular.module('UserServiceAPI',[])
	.service('UserService', function($http, $q, $window){
		var vm=this;

		var currentUser ;

		vm.logout = function(){
			currentUser=undefined;
			$window.localStorage.clear();
		}

		vm.isLogged=function(){
			return !!$window.localStorage.user;
		}	

		vm.getCurrentUser = function(){
			return currentUser;
		}

		vm.getUser = function(){
			var defer = $q.defer();
			$http.get('/auth/user').then(function(data){
				data = data.data;
				var user={};
				if(data.hasOwnProperty('local')){
					user.displayName = data.local.email;
					user.id = data._id;
				} else if(data.hasOwnProperty('twitter')){
					user.displayName = data.twitter.displayName;
					user.id = data._id;
				} else if(data.hasOwnProperty('facebook')){
console.log("auth facebook")					;
					user.displayName = data.facebook.name;
					user.id = data._id;
				} else if(data.hasOwnProperty('google')){
					user.displayName = data.google.name;
					user.id = data._id;
				}

				currentUser = user;
console.log("auth service",user, data);
				if(currentUser.id) {
					$window.localStorage.setItem('user', JSON.stringify(currentUser));
				}

				defer.resolve(user);

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
				data = data.data;
				var user={};
				if(data.hasOwnProperty('local')){
					user.displayName = data.local.email;
					user.id = data._id;
				} else if(data.hasOwnProperty('twitter')){
					user.displayName = data.twitter.displayName;
					user.id = data._id;
				} else if(data.hasOwnProperty('facebook')){
					user.displayName = data.facebook.name;
					user.id = data._id;
				} else if(data.hasOwnProperty('google')){
					user.displayName = data.google.name;
					user.id = data._id;
				}

				defer.resolve(user);

			})
			.catch(function(err){
				defer.reject();
			})

			return defer.promise;
		}



	});