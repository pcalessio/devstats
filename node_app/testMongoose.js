var mongoose   = require('mongoose');
var KeyEvent     = require('./model/KeyEvent');


mongoose.connect('mongodb://ds053449.mongolab.com:53449/devstats');

mongoose.connect('mongodb://DevStatsAll:password1@ds053449.mongolab.com:53449/devstats');

var keyEvents = KeyEvent.find();
