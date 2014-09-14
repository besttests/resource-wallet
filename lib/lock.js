module['exports'] = function(options, callback) {
    var wallet = require('resource').wallet;
    wallet.get(options.id, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (typeof result === 'undefined') {
            return callback(null, 'failure');
        }
        
        if(result.status !== 'locked') {
            result.prevstatus = result.status;
            result.status = 'locked';
        }
        result.save(function(err) {
            callback(err, result);
        });
    });
};