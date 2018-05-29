const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const keys = require('./config/keys');
const posts = require('./routes/posts');
const profile = require('./routes/profile');
const users = require('./routes/users');
require('./config/passport')(passport);

const PORT = process.env.PORT || 5000;

const app = express();

// connect to database with the given configuration
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// api routes
app.use(posts);
app.use(profile);
app.use(users);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client/build/index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
