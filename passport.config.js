var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;

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
	));


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
			if (user) return done(null, user)
			else {
				var newUser = new User();

				newUser.facebook.id = profile.id;
				newUser.facebook.token = token;
				newUser.facebook.name = profile.name.givenName + ' '+ profile.name.familyName;

console.log("facebok",JSON.stringify(profile));
				newUser.facebook.email = profile.emails[0].value;

				newUser.save(function(err){
					if (err) throw err;

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
			if (user) return done(null, user)
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

					return done(null, newUser);
				});
			} //else
		}) // User.findOne
	}); //nextTick
}))



} /// module.exports
