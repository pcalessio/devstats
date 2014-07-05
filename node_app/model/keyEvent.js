var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var KeyEventSchema   = new Schema({
    key: String,
    timestamp: Date,
    type: String,
    filepath: String
});

module.exports = mongoose.model('KeyEvent', KeyEventSchema);
