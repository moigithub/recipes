

var express = require('express');
var app = express();

var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var modRewrite = require('connect-modrewrite');

mongoose.connect('mongodb://localhost/recipes');

app.use(morgan('dev'));
app.use(cookieParser());
//app.use(bodyParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.use(passport.initialize());
app.use(passport.session());


require('./passport.config')(passport);

/*
app.use(modRewrite([
    '^/recipe/(.*)$ /index.html#!/recipe/$1 [L]'
  ]))
*/

/******************/
//     ROUTES
/******************/
app.get('/auth/logout', function(req, res, next){
	req.logout();
	res.redirect('/#!/authCheck');
});

function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()) return next();

	res.redirect('/');
}


app.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/#!/authCheck',
	failureRedirect: '/'
}));

app.post('/login', passport.authenticate('local-login', {
	successRedirect: '/#!/authCheck',
	failureRedirect: '/'
}));

app.get('/auth/facebook', passport.authenticate('facebook',{scope: 'email'}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/#!/authCheck',
	failureRedirect : '/'
}));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
	successRedirect: '/#!/authCheck',
	failureRedirect : '/'
}));

app.get('/auth/user', function(req,res,next){
	res.json(req.user);
});

console.log(__dirname);
app.use(express.static(__dirname+'/src', { redirect: false }));



app.use('/recipes', require('./recipes'));



app.get('*',function(req,res){
	console.log("server url",req.originalUrl);
	//res.sendFile("/src/index.html", { root: __dirname });
	res.redirect("/?goto="+req.originalUrl);
})

app.listen(process.env.PORT || 3000, function(){
	console.log('listening.... on :3000')
})