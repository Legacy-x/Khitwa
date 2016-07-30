//var linksController = require('../users/userController.js');
var userController = require('../users/userController.js');
var eventController = require('../events/eventController.js');
//var messageController = require('../message/messageController.js')
var helpers = require('./helpers.js'); // our custom middleware
//var multer = require('multer');
// var storage =   multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './uploads');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now());
//   }
// });

// var upload = multer({ storage : storage},{limits : {fieldNameSize : 10}}).single('userPhoto');


module.exports = function (app, express) {
  app.post('/api/users/signin', userController.signin);
  app.post('/api/users/signup', userController.signup);  
  app.get('/api/users/signedin', userController.checkAuth);
  app.get('/api/users', userController.getAllUsers);
  app.get('/api/user/:id',userController.getUser);
  app.get('/api/events',eventController.allEvents);  
  app.post('/api/createEvent',eventController.newEvent);
  //app.get('/api/getEvents', userController.getAllEvents)
  //app.get('/api/event/:id/message', )
 // app.post('/api/photo', function(req, res){
  //   upload(req, res, function(err){
  //     if(err){
  //       return res.end("error uploading the file")
  //     }
  //     return res.end("file uploaded")
  //   })    
  // });
  app.get('/api/event/:id',eventController.getEvent);
  app.post('/api/applyEvent',eventController.applyEvent);

  //app.get ('/message', messageController.)

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

