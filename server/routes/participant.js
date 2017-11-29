'use strict';
const express = require('express');
const participant = express.Router();
const validateParticipant = require('./middleware').validateParticipant;

let participantId = 2;
const USERS = [
  { id: 0, firstName: 'Laura', lastName: 'Doyle', email: 'fleurguson@gmail.com'},
  { id: 1, firstName: 'Justin', lastName: 'Doyle', email: 'muddpuddle13@gmail.com'}
];
let ASSIGNMENTS = [];

participant.route('/')
.get((req, res) => {
  res.json({
    data: USERS
  });
})
.post(validateParticipant, (req, res) => {
  const newParticipant = {
    id: participantId++,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  }

  USERS.push(newParticipant);
  return res.status(201).json({
    data: newParticipant
  });
});

participant.route('/assignments')
.get((req, res) => {
  return res.json({
    data: ASSIGNMENTS
  });
});

participant.route('/assign-all')
.get((req, res) => {

  if (USERS.length <= 2) {
    return res.status(422).json({
      error: 'There must at least 3 participants before you can assign'
    });
  }

  const randomizedUsers = [];
  let oldUsers = [...USERS];
  while (oldUsers.length > 0) {
    const index = Math.round(Math.random() * (oldUsers.length - 1));
    randomizedUsers.push(oldUsers[index]);
    oldUsers = [
      ...oldUsers.slice(0, index),
      ...oldUsers.slice(index + 1, oldUsers.length)
    ];
  }

  const assignments = randomizedUsers.map((user, i) => {
    const nextUser = randomizedUsers[(i + 1) % randomizedUsers.length];
    return {
      participant: user,
      assignment: nextUser
    };
  });

  ASSIGNMENTS = assignments;

  return res.json({
    data: ASSIGNMENTS
  });
});

participant.route('/:id')
.get((req, res) => {
  const participant = USERS.find(p => p.id === req.params.id);

  if (!participant) {
    res.status(404).json({
      error: 'Particpant not found'
    });
  }

  res.json({
    data: participant
  });
});

module.exports = participant;
