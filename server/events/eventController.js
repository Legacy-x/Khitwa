var Event=require('./eventModel.js');
var User=require('../users/userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');


var findEvent = Q.nbind(Event.findOne, Event);
var createEvent = Q.nbind(Event.create, Event);
var findAllEvents = Q.nbind(Event.find, Event);

module.exports ={

	allEvents : function (req,res,next) {
		findAllEvents({})
			.then(function (events) {
				res.json(events);
			})
			.fail(function (err) {
				//next(err);
			})
	},

	newEvent: function (req, res, next) {
		console.log("enter")
		// var token = req.headers['x-access-token'];
		//    if (!token) {
		//      next(new Error('No token'));
		//    } else {
		//      var user = jwt.decode(token, 'secret');
		//  }
	  	var tempEvent = {
			title : req.body.title,
			_owner : req.body._owner,
			startDate : req.body.startDate,
			endDate : req.body.endDate,
			location : req.body.location,
			locationId : req.body.locationId,
			type : req.body.type,
			description : req.body.description,
			skillsrequired : req.body.skillsrequired,
			positionLat: req.body.positionLat,
			positionLng: req.body.positionLng,
			website: req.body.website,
			startHour : req.body.startHour ,
			endHour : req.body.endHour,
			poster : req.body.poster
	  	}
	  	//console.log(tempEvent);
	  	createEvent(tempEvent)
	  		.then(function (createdEvent) {
		        if (createdEvent) {
		        	console.log('event created');
		        	console.log(createdEvent);
		          res.json(createdEvent);
		        }
		      })
		      .fail(function (error) {
		        next(error);
		      });

  	},


  	//Test : Get
  	//http://127.0.0.1:8000/api/event/5790db44f97a940c03550a89

  	getEvent : function (req,res,next) {

  		 console.log(req.params.id);
  		 var id=(req.params.id).toString();

  		Event.findOne({_id: id}, function(err, doc) {
  			if(err)
  				res.status(500).send(err);
		  res.status(200).send(doc);
		});
  		
  	},

  

  	// Test : Post
  	// http://127.0.0.1:8000/api/applyEvent
  	// body :
 	// {
	//   "userId" : "5791c28d6b44ec0c052b6c79",
	//   "eventId" : "5791c53e990f8c9c16839fbd"
	// }

  	applyEvent :function (req , res , next) {
  		var userId=req.body.userId.toString();
  		var eventId=req.body.eventId;
  		User.update({ _id: userId },{ $pull: { events: eventId } },function(err) {if(err) console.log(err)});
  		User.update({ _id: userId },{ $push: { events: eventId } }
  			, function (err) {
  				if(err)
  					console.log(err);
  				else
  					console.log('add it');
  			});
  		Event.update({ _id: eventId },{ $pull: { users: userId } },function(err) {if(err) console.log(err)});
  		Event.findOneAndUpdate({ _id: eventId },{ $push: { users: userId } } , { new : true}
  			, function (err , event) {
  				if(err)
  					console.log(err);
  				else{
  					console.log('add it');
  					res.json(event);
  				}
  			});

	}

}