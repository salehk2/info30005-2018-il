const express = require('express');
const app = express();

const router = require('./routes/routes');

app.use(router);

app.listen(3000, function() {
    console.log('Server started at port 3000');
})
