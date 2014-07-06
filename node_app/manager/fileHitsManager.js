var FileHits     = require('../model/fileHits');

exports.newFileHitsEvent = function newFileHitsEvent(filename, callback) {

    FileHits.findOne({ filename: filename }, function (err, fileHits) {
        if(fileHits) {
           fileHits.hits++;
           fileHits.save();
        } else {
            fileHits = new FileHits();
            fileHits.filename = filename;
            fileHits.hits = 1;
            fileHits.save(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
        console.log(fileHits);
        callback(fileHits);
    });
};

