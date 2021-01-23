const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

// Init middleware
// app.use(logger);

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

// Get Single Member, `:id` is a url param, and use a req to grab the :id param
app.get('/api/members/:id', (req, res) => {
  // Normally I'd use filter, but since it's a "single" member, array.find() would be great here
  res.json(members.find((member) => member.id === parseInt(req.params.id)));
});

// Set static folder
// use is a function we use for when we want to include middleware
app.use(express.static(path.join(__dirname, 'public')));

// check for PORT env var and use 5000 otherwise
const PORT = process.env.PORT || 5000;

// Callback as 2nd param
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
