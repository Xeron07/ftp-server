//DECLARATION
var express  		= require('express');
var login 			= require('./controller/login');
var signUp 			= require('./controller/signUp');
var home 			= require('./controller/home');
//var logout 			= require('./controller/logout');
var bodyParser 		= require('body-parser');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var path=require("path");
var fs= require("fs");
var app 			= express();


//CONFIGURATION
app.set('view engine', 'ejs');


//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret', saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use('/login', login);
app.use('/signUp', signUp);
app.use('/home', home);
//app.use('/logout', logout);
app.use('/ext', express.static('ext'));
app.use('/dataHouse', express.static('dataHouse'))

//ROUTES
app.get('/',login);
app.post("/home",home);

app.post("/deleteFile",(req,res)=>{
   var filePath=__dirname+"\\dataHouse\\"+req.session.uid+"\\"+req.body.fName;
   fs.unlinkSync(filePath, function (err) {
    if (err) {
			console.log("ïn12");
		res.json({success:false});
	};
		// if no error, file has been deleted successfully
		console.log("ïn");
	
}); 
res.json({ success: true });
});

app.post("/createFolder",(req,res)=>{
	var dir=__dirname+"\\dataHouse\\"+req.session.uid+"\\"+req.body.dirName;
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
}
res.json({ success: true });
});


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
