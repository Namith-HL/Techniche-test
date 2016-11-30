cluster = require('cluster');
var numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
	    var env = {workerId: i},
	    newWorker = cluster.fork(env);
	    newWorker.process.env = env;
    
  }
   Object.keys(cluster.workers).forEach(function(id) {
       console.log("I am running with ID : "+cluster.workers[id].process.pid);
   });
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    var env = worker.process.env,
    newWorker = cluster.fork(env);
    newWorker.process.env = env;
  });
} else {

		express = module.exports = require('express');
		var bodyParser     = require('body-parser');
		var nodemailer = require("nodemailer");
		app = module.exports = express();
		var bodyParser     = require('body-parser');
		var session = require('express-session');
		var mongoose       = require('mongoose');
		var fs = require('fs');
		var morgan = require('morgan');
		var busboy = require('connect-busboy');
		var helmet = require('helmet');
		app.use(bodyParser.urlencoded({
		  extended: true
		}));
		app.use(bodyParser.json());
		app.disable('x-powered-by');
		app.use(helmet());
		app.use(helmet.frameguard('sameorigin'));
		app.use(helmet.noCache());
		app.use(helmet.frameguard());
		process.env.NODE_ENV = "local_machine";
		var path = module.exports = require("path"); 
		var config = require("./config/config.js").getConfig();
		app.locals.config = config;
		
			app.use(session({cookieName: 'session', secret: 'sablaasaasblargblarg',resave: true, saveUninitialized: true ,
			/*store: store,*/ duration: 24 * 60 * 60 * 1000, }));
		// mongodb
		mongoose.connect(app.locals.config.mongoDB_path);
		// mysql
		var Model = require('./config/db.js');
		//var mysql = require('./config/mysql.js');
		var addBook = Model.libraryBooks;
		var libUsers = Model.libraryUser;
		var libTransct = Model.libraryTransct;
		//mysqlconnection = mysql.mysqlconnection;
		// loging req info
		var accessLogStream = fs.createWriteStream(__dirname + '/logs/access_log.log', {flags: 'a'});
		app.use(morgan('combined', {stream: accessLogStream}));
		app.use(busboy({immediate: true}));
		// public folder contains html css and images
		app.set('views', __dirname + '/public/views');
		app.engine('html', require('ejs').renderFile);
		app.set('view engine', 'html');
		app.use(express.static('public'));
		
	
		app.get('/',function(req,res){
			res.render('index.html');
		});
		app.post('/addBook',function(req,res){

			var item = new addBook ({
       			 	Name :req.body.name,
        			Author:req.body.author, 
        			Status : 'Available'
    		});
			item.save(function (err, data) {
                if (err) {
                    console.log(err);
                }
                else{
                     res.send({data:"success"});
                } 
            });

		});

		app.post('/addTransct',function(req,res){
			var date = new Date();
			var item = new libTransct ({
       			 	user_id :req.body.user,
        			book_id:req.body.book,
        			duedate: date,
        			status : 'Issued'
    		});
			item.save(function (err, data) {
                if (err) {
                    console.log(err);
                }
                else{

                	addBook.update( { _id: req.body.book },{ $set: { Status : "UnAvailable" }},function(err1,data){
					
							if(data.ok == 1){
					 			res.send({data:"success"});
							}

						})
                    
                } 
              });
            

		});

		app.post('/updateTransct',function(req,res){

			libTransct.find( { _id: req.body.id },function(err,data){
							if (err) {
                    console.log(err);
                }
                			
							data[0].status = "Returned";
							data[0].save(function (err1, data1) {
                			if (err1) {
                    			console.log(err1);
                			}
                		else{
                     			
                				addBook.update( { _id: data1.book_id },{ $set: { Status : "Available" }},function(err1,data){
					
										if(data.ok == 1){
					 						res.send({data:"success"});
										}

									})
                			} 
            			});
				})
		});


		app.post('/getuserBooks',function(req,res){

			libTransct.find({user_id:req.body.id,status:'Issued'}).populate('book_id').exec(function(err,response){
				if(err){

				}
				else{


					res.send({data:response});
				}
			});

		});

		app.get('/getbooks',function(req,res){

			addBook.find({Status:'Available'},function(err,response){
				if(err){

				}
				else{
					res.send({data:response});
				}
			});

		});

		app.get('/getusers',function(req,res){

			libUsers.find({},function(err,response){
				if(err){

				}
				else{
					res.send({data:response});
				}
			});

		});



		app.post('/deleteBook',function(req,res){

			addBook.remove({"_id":req.body.id},function(err,response){
				if(err){

				}
				else{
					res.send({data:'success'});
				}
			});

		});

				//app.use(errorHandler.logErrors);
		//app.use(errorHandler.sendMail);
		//app.use(errorHandler.handleError);

		app.listen(config.port,function(){
		  console.log('I am running on Port: '+config.port);
		});
		//testing
		//Secong testng comment
}