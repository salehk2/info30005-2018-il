var mongoose = require('mongoose');


var postSchema = mongoose.Schema(
    {
        "title":String,
        "content":String,
        "author":String
    }
);

mongoose.model('Post', postSchema);
