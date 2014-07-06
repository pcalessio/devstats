var MomentDay = require('../model/momentDay');

var codingTimeInterval = 30*1000;
var thinkingTimeInterval = codingTimeInterval + 5*60000;


exports.updateMomentDate = function save(keyEvent, callback) {

    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    console.log('today is' + today);

    MomentDay.findOne({ day: today }, function (err, momentDate) {
        if(momentDate) {
            var last = momentDate.last;
            var diff = new Date(keyEvent.timestamp) - last; //diff in millisec
            momentDate.last = keyEvent.timestamp;

            if(diff >= 0 && diff < codingTimeInterval) {
                momentDate.codingTime += diff;
            } else if(diff >= 0 && diff >= codingTimeInterval && diff < thinkingTimeInterval) {
                    momentDate.thinkingTime += diff;
            } else if(diff >= thinkingTimeInterval) {
                    momentDate.sleepingTime += diff;
            }

            momentDate.save();
            console.log('diff' + diff);

        } else {
            momentDate = new MomentDay();
            momentDate.day = today;
            momentDate.last = keyEvent.timestamp;
            momentDate.thinkingTime = 0;
            momentDate.codingTime = 0;
            momentDate.sleepingTime = 0;

            momentDate.save(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
        console.log(momentDate);
        callback(momentDate);
    });
};
