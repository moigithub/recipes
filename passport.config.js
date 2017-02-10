var LocalStrategy = require('passport-local').Strategy;

var User = require('./User.model.js');

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});


	//************************
	// Register new user
	//************************
	passport.use('local-signup', new LocalStrategy({
		userNameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, 
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({'local.email': email}, function(err, user){
				if (err) return done(err);

				if(user){
					// email already exist
					return done(null, false);
				} else {
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function(err){
						if(err) throw err;

						return done(null, newUser);
					})
				}
			});
		});
	}


	//************************
	// Login  user
	//************************
	passport.use('local-login', new LocalStrategy({
		userNameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, 
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({'local.email': email}, function(err, user){
				if (err) return done(err);

				if(!user) return done(null, false);

				if (!user.validPassword(password)) return done(null, false);

				return done(null, user);
			});
		});
	}



	));




}
