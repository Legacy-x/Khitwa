var express = require('express');

var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);


var mongoose = require('mongoose');
var user=require('./users/userModel.js');
var user=require('./events/eventModel.js');
//var io = require('socket.io')(server);

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);
//require('./socketIO/socketIO.js')(io);
// connect to mongo database named "khatwa"
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Khitwa');
db=mongoose.connection;
db.once('open',function () {
	console.log('mongo db is open');
});

var chatSchema = mongoose.Schema({
	username:String,
	message:String,
	time:{type:Date, default:Date.now},
	 _owner : { 
  		type: mongoose.Schema.Types.ObjectId,
  		ref: 'Event'
  	}
});

var Chat = mongoose.model('Chat', chatSchema);


	// getMessages : function (req,res,next) {
 //  		console.log(req.parms.id);
 //  		var id = (req.parms.id).toString();

 //  		Event.find({}, function(err, doc){
 //  			if(err)
 //  				res.status(500).send(err);
 //  			res.status(200).send(doc)
 //  		});
 //  	}


var users = [];
//var eventId = window.location.href.split('/')[5];

io.on('connect', function(socket){
	var query = Chat.find({});
	 query.sort('-time').limit(10).exec( function(err,docs){
		if(err) throw err;
		socket.emit('load old msgs', docs);
	});
	var username ='';
	console.log(username+'has connected')
	

	socket.on('request-users', function(){
		socket.emit('users', {users:users});
	});
	socket.on('message', function(data){
		io.emit('message', {username:username, message:data.message, _owner:data._owner});
		
	var newMsg = new Chat({username:username, message:data.message,
	 _owner:data._owner});

	newMsg.save(function(err){
		if(err) throw err
	});
		
	})
	

	socket.on('add-user', function(data){
		if(users.indexOf(data.username)==-1){
			io.emit('add-user', {
				username:data.username,
				eventId:data.eventId
			});
			username=data.username;
			users.push(data.username);
		}else{
			socket.emit('prompt-username', {
				message:'User Already Exists'
			})
		}
	})

	socket.on('disconnect',function(){
		console.log(username +' has disconnected!')
		users.splice(users.indexOf(username), 1);
		io.emit('remove-user', {username:username});
	})
})
// start listening to requests on port 8000
var port = 8000;
http.listen(port);
console.log('listen to ',port);



// export our app for testing and flexibility, required by index.js
module.exports = app;
