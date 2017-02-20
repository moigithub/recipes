var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var jwt = require('jsonwebtoken');

var config = require('/config.js');

var configAuth = require('./auth.conf.js');

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
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback : true
		}, 
		function(req, email, password, done){
			process.nextTick(function(){
console.log("local -signup passport")				;
				User.findOne({'local.email': email}, function(err, user){
					if (err) return done(err);

					if(user){
						// email already exist
						return done(null, false);
					} else {
console.log("registering new ", email, password);
						var newUser = new User();
						newUser.local.email = email;
						newUser.local.password = newUser.generateHash(password);

						newUser.save(function(err){
							if(err) throw err;

							var token = jwt.sign(newUser, config.superSecret, {
								expiresInMinutes: 60*24   //expira en 24 horas
							});

							newUser.token = token;

							return done(null, newUser);
						})
					}
				});
			});
		}
	));


	//************************
	// Login  user
	//************************
	passport.use('local-login', new LocalStrategy({
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback : true
		}, 
		function(req, email, password, done){
			process.nextTick(function(){
console.log("local -login passport")				;				
				User.findOne({'local.email': email}, function(err, user){
					if (err) return done(err);

					if(!user) return done(null, false);

					if (!user.validPassword(password)) return done(null, false);
console.log("login", email, password);

					var token = jwt.sign(user, config.superSecret, {
						expiresInMinutes: 60*24   //expira en 24 horas
					});

					user.token = token;


					return done(null, user);
				});
			});
		}
	));


///////////
// facebook auth
///////////

passport.use(new FacebookStrategy({
	clientID : configAuth.facebookAuth.clientID,
	clientSecret : configAuth.facebookAuth.clientSecret,
	callbackURL : configAuth.facebookAuth.callbackURL,
	profileFields: ['email','name']
}, function(token, refreshToken, profile, done){
	process.nextTick(function(){
		User.findOne({'facebook.id': profile.id}, function(err, user){
			if (err) return done(err);
			if (user) {
				var token = jwt.sign(user, config.superSecret, {
					expiresInMinutes: 60*24   //expira en 24 horas
				});

				user.token = token;

				return done(null, user);
			}
			else {
				var newUser = new User();

				newUser.facebook.id = profile.id;
				newUser.facebook.token = token;
				newUser.facebook.name = profile.name.givenName + ' '+ profile.name.familyName;

console.log("facebok",JSON.stringify(profile));
				newUser.facebook.email = profile.emails[0].value;

				newUser.save(function(err){
					if (err) throw err;

					var token = jwt.sign(newUser, config.superSecret, {
						expiresInMinutes: 60*24   //expira en 24 horas
					});

					newUser.token = token;

					return done(null, newUser);
				});
			} //else
		}) // User.findOne
	}); //nextTick
}))

///////////
// twitter auth
///////////

passport.use(new TwitterStrategy({
	consumerKey : configAuth.twitterAuth.consumerKey,
	consumerSecret : configAuth.twitterAuth.consumerSecret,
	callbackURL : configAuth.twitterAuth.callbackURL
}, function(token, tokenSecret, profile, done){
	process.nextTick(function(){
		User.findOne({'twitter.id': profile.id}, function(err, user){
			if (err) return done(err);
			if (user) {
				var token = jwt.sign(user, config.superSecret, {
					expiresInMinutes: 60*24   //expira en 24 horas
				});

				user.token = token;

				return done(null, user);
			}
			else {
				var newUser = new User();

				newUser.twitter.id = profile.id;
				newUser.twitter.token = token;
				newUser.twitter.username = profile.username;
				newUser.twitter.displayName = profile.displayName;

				console.log(profile);
				//newUser.twitter.email = profile.emails[0].value;

				newUser.save(function(err){
					if (err) throw err;

					var token = jwt.sign(newUser, config.superSecret, {
						expiresInMinutes: 60*24   //expira en 24 horas
					});

					newUser.token = token;

					return done(null, newUser);
				});
			} //else
		}) // User.findOne
	}); //nextTick
}))



} /// module.exports
