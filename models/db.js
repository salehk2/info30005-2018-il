var mongoose = require('mongoose');

mongoose.connect('mongodb://sak2:sak474@ds014648.mlab.com:14648/illuminate', function (err) {
    if (!err) console.log('connected to mongo');
    else console.log('failed to connect to mongo');
})

require('./post.js');