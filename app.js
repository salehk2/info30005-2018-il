const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const router = require('./routes/routes');

app.use(router);

app.listen(3000, function() {
    console.log('Server started at port 3000');
})
