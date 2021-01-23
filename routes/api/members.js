const express = require('express');
const uuid = require('uuid');
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

// Create Member, when wanting to add you POST in most cases
router.post('/', (req, res) => {
  // When dealing with IDs and using a DB like mongo or mysql/postgresql, it usually creates
  // ID automatically, but since example is not using a DB, we're using UUID
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  };

  // Want to add new member to array, but make sure that name and email are sent with req
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }
  // if no provided else, then we get an error: "Headers are already sent", but you can return above instead if you don't want else

  members.push(newMember);
  // need to send back a response, but up to me with what I want to respond with
  // ex: I could respond with the new member itself, but I'm going to respond with the new array
  res.json(members);
});

// Update Member
router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({ msg: 'Member updated', member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with id of ${req.params.id}` });
  }
});

module.exports = router;
