const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const router = require('./routes/routes');

app.use(router);

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Server started at port 3000');
})
