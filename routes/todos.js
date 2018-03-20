const express = require('express');
const router = express.Router();
const log = require('../js/log');
const constants = require('../helpers/constants');
const mongoose = require('mongoose');
const db = require('../js/db');
const ToDo = require('../models/todo');
const helper = require('../helpers/helper');
const messages = require('../helpers/messages');

router.get('/', (req, res, next) => {
  ToDo.find({author:req.decoded.name})
    .then(todos => {
      console.log(todos);
      res.json(todos);
    })
    .catch(err => {
      helper.prepareError(err, constants.SERVER_ERROR, messages.ERROR_GET);
      next(err);
    })
});

router.post('/', (req, res, next) => {
  const newToDo = Object.assign(new ToDo(), {
    context: req.body.context,
    author: req.decoded.name,
    status: req.body.status,
    createdDate: new Date(new Date().toISOString()),
  });

  var error = newToDo.validateSync();
  if (error && error.errors) {
    res.sendStatus(constants.SERVER_ERROR);
  }
  console.log(newToDo);
  ToDo.create(newToDo)
    .then(todo => {
      console.log('created');
      res.json({message: "New ToDo Created!"});
    })
    .catch(err => {
      helper.prepareError(err, constants.SERVER_ERROR, messages.ERROR_CREATE);
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const parsedId = mongoose.Types.ObjectId(id);

    ToDo.findById(parsedId)
      .then(todo => {
        if (!todo) {
          res.sendStatus(constants.BAD_REQUEST);
        } else {
          res.json(todo);
        }
      })
      .catch(err => {
        helper.prepareError(err, constants.SERVER_ERROR, `Error occured during getting todo with id=${id} operation`);
        next(err);
      })
  } else {
    res.sendStatus(constants.BAD_REQUEST);
  }
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const parsedId = mongoose.Types.ObjectId(id);

    const todo = Object.assign(new ToDo(), {
      _id: parsedId,
      context: req.body.context,
      author: req.decoded.name,
      status: req.body.status,
      createdDate: new Date(new Date().toISOString())
    });

    if(todo.status=="Done"){
      todo.resolvedDate = new Date(new Date().toISOString());
    }

    var error = todo.validateSync();
    if (error && error.errors) {
      res.sendStatus(constants.SERVER_ERROR);
    }

    ToDo.update({ _id: parsedId }, todo)
      .then(todo => {
        if (todo.n == 0) {
          res.sendStatus(constants.BAD_REQUEST);
        } else {
          res.json(todo);
        }
      })
      .catch(err => {
        helper.prepareError(err, constants.SERVER_ERROR, `Error occured during updating todo with id=${id} operation`);
        next(err);
      })
  } else {
    res.sendStatus(constants.BAD_REQUEST);
  }
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const parsedId = mongoose.Types.ObjectId(id);

    ToDo.remove({ _id: parsedId })
      .then(todo => {
        if (todo.n == 0) {
          res.sendStatus(constants.SERVER_ERROR);
          return;
        } else {
          res.sendStatus(constants.OK);
        }
      })
      .catch(err => {
        helper.prepareError(err, constants.SERVER_ERROR, `Error occured during deleting todo with id=${id} operation`);
        next(err);
      })
  } else {
    helper.prepareError(err, constants.BAD_REQUEST, `Bad request with uncorrect id=${id}`);
    next(err);
  }
});

module.exports = router;