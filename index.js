const express = require('express');
const path = require('path');
const members = require('./Members');

const app = express();

// to create middleware, it takes, req, res, and next. Always call next last
// so you can move to the next middleware function that's in the stack
const logger = (req, res, next) => {
  // req gives access to certain parts fo the url
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
};

// Init middleware
app.use(logger);

// create a route, 2nd param is a func
// app.get('/', (req, res) => {
//   // Can send a single file, a JSON res.JSON, can do res.render and render an HTML template
//   //res.send('<h1>Hello World!!</h1>'); // Send to the browser

//   // this isn't ideal because then you'd have to put a route manually for every single page
//   // if you want just a static server that serves html, css, imgs, etc, then
//   // express comes with functionality to make a certain folder a static folder
//   //res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Gets all members
app.get('/api/members', (req, res) => {
  // when I want to return JSON, also don't need to stringify because json() will take
  // care of it
  res.json(members);
});

// Set static folder
// use is a function we use for when we want to include middleware
app.use(express.static(path.join(__dirname, 'public')));

// check for PORT env var and use 5000 otherwise
const PORT = process.env.PORT || 5000;

// Callback as 2nd param
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
