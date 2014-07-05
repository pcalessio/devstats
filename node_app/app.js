// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var KeyEvent     = require('./model/KeyEvent');


mongoose.connect('mongodb://localhost/test');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());
app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');

var port = process.env.PORT || 3000; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/health', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/key/event')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var keyEvent = new KeyEvent(); 		// create a new instance of the Bear model

        keyEvent.key = req.body.key;  // set the bears name (comes from the request)
        keyEvent.timestamp = req.body.timestamp;
        keyEvent.type = req.body.type;
        keyEvent.filepath = req.body.filepath;

        socket.emit('newKeyEvent', keyEvent);
        // save the bear and check for errors
        keyEvent.save(function(err) {
            if (err)
                res.send(err);
        });

        res.json({ message: 'Key event created!' });
    });

app.get('/', function(req, res) {
    res.render('index');
});

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
var listen = app.listen(port);
console.log('Magic happens on port ' + port);
var socket = require('socket.io')(listen);