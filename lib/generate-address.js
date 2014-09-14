module['exports'] = function(options, callback) {
    var wallet = require('resource').wallet;
    wallet.get(options.id, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (typeof result === 'undefined') {
            return callback(null, 'failure');
        }
        //check status
        if (result.status === 'locked') {
            return callback(new Error('Wallet lockedd'), 'locked wallet');
        }        
        // do not allow regeneration of keys
        if (typeof result.receivingAddresses[options.type] !== 'undefined') {
            return callback(null, 'failure');
        }
        result.receivingAddresses[options.type] = options.publicKey;
        result.save(function(err) {
            callback(err, result);
        });
    });
};