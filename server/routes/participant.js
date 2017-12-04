'use strict';
const express = require('express');
const participant = express.Router();
const validateParticipant = require('./middleware').validateParticipant;
const User = require('../models/User');


participant.route('/')
.get((req, res) => {
  const user = new User();
  user.all((err, users) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.json({
      data: users
    });
  })
})
.post(validateParticipant, (req, res) => {
  const newParticipant = {
    id: null,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  }

  const user = new User();
  user.insert(newParticipant, (err, id) => {
    if (err) {
      return res.status(500).json(err);
    }

    newParticipant.id = id;
    return res.status(201).json({
      data: newParticipant
    });
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
