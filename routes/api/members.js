const express = require('express');
const router = express.Router();
const members = require('../../Members');

// Express is unopinionated, everyone does things differently, so this is one way of
// structuring files, code, and organizing api requests

// Gets all members
router.get('/', (req, res) => {
  // when I want to return JSON, also don't need to stringify because json() will take
  // care of it
  res.json(members);
});

// Get Single Member, `:id` is a url param, and use a req to grab the :id param
router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    // Normally I'd use filter, but since it's a "single" member, array.find() would be great here
    res.json(members.find((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with id of ${req.params.id}` });
  }
});

module.exports = router;
