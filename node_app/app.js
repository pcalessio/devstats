// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var KeyEvent        = require('./model/keyEvent');
var FileHitsManager = require('./manager/fileHitsManager');
var KeyEventManager = require('./manager/keyEventManager');
var MomentDayManager = require('./manager/momentDayManager');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
mongoose.connect("mongodb://seedhack_team:seedhack@ds053449.mongolab.com:53449/devstats", options);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

//serving static files
app.use(express.static(__dirname + '/public'));

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

router.route('/key/event')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var keyEvent = new KeyEvent();
        keyEvent.key = req.body.key;
        keyEvent.timestamp = req.body.timestamp*1000;
        keyEvent.type = req.body.type;
        keyEvent.filepath = req.body.filepath;

        MomentDayManager.updateMomentDate(keyEvent, function(momentDay) {
            socket.emit('momentDay', momentDay);
        });

        FileHitsManager.newFileHitsEvent(keyEvent.filepath, function(fileHits) {
            socket.emit('newKeyEvent', keyEvent);
            socket.emit('fileHit', fileHits);
        });

        KeyEventManager.save(keyEvent);

        res.json({ message: 'Key event created!' });
    });

app.get('/', function(req, res) {
    res.render('index');
});

router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER and socket.io
// =============================================================================
var listen = app.listen(port);
console.log('Magic happens on port ' + port);
var socket = require('socket.io')(listen);