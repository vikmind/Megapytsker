'use strict';

var db = require('../models/index.js');
var tape = {
  "name": "Read ticket from admin screen",
  "isDefault": false
};
var operations = [
  {
    "name": "Select default card",
    "type": "selectCard",
    "args": ["INIT", 0]
  },
  {
    "name": "Touch \"Read ticket\"",
    "type": "touchScreen",
    "args": [145, 254]
  },
  {
    "name": "Select card \"AT&nbsp;3390537C\" and wait 2s",
    "type": "selectCard",
    "args": ["AT 3390537C", 2000]
  },
  {
    "name": "Select default card",
    "type": "selectCard",
    "args": ["INIT", 0]
  },
  {
    "name": "Touch \"OK\"",
    "type": "touchScreen",
    "args": [163, 433]
  }
];

db.Tape.create(tape).then(inserted => {
  db.Operation.bulkCreate(operations.map(item => {return {...item, TapeId: inserted.id}}));
});
