var KeyEvent = require('../model/keyEvent');

exports.save = function save(keyEvent) {
    keyEvent.save(function(err) {
        if (err) {
            console.log(err);
        }
    });
};
