var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MomentDaySchema   = new Schema({
    day: Date,
    last: Date,
    thinkingTime: Number,
    codingTime: Number,
    sleepingTime: Number
});

module.exports = mongoose.model('MomentDay', MomentDaySchema);
