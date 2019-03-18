//DECLARATION
var express  		= require('express');
var login 			= require('./controller/login');
var signUp 			= require('./controller/signUp');
//var home 			= require('./controller/home');
//var logout 			= require('./controller/logout');
var bodyParser 		= require('body-parser');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var app 			= express();


//CONFIGURATION
app.set('view engine', 'ejs');


//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret', saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use('/login', login);
app.use('/signUp', signUp);
//app.use('/home', home);
//app.use('/logout', logout);
app.use('/assets', express.static('ext'))

//ROUTES
app.get('/',login);


//SERVER STARTUP
app.listen(5000, function(){
	console.log('server started at 5000...');
});

app.get('/setCookie', (req, res)=>{
	res.cookie('cookie1', 'this is my first cookie');
	res.send('done!');
});

app.get('/viewCookie', (req, res)=>{
	//console.log(res.cookie['cookie1']);
	res.send(req.cookies['cookie1']);
});

app.get('/rmCookie', (req, res)=>{
	res.clearCookie('cookie1');
	res.send('removed!');
});
