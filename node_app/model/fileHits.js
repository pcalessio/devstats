var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var fileHitsSchema   = new Schema({
    filename: String,
    hits: Number
});

module.exports = mongoose.model('FileHits', fileHitsSchema);

