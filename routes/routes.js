const express = require('express')

const Burger = require('../models/Burger')
const router = express.Router()

router.get('/burgers', (req, res, next) => {
  req.app.locals.db.collection('burgers').find({}).toArray((err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined || result.length === 0) {
      res.status(400).send({'error':'No burgers in database'})
    } else {
      res.status(200).send(result)
    }
  })
})

router.get('/burgers/:id', (req, res, next) => {
  req.app.locals.db.collection('burgers').findOne({
    '_id': req.params.id
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined) {
      res.status(400).send({'error':'No burger matching that id was found'})
    } else {
      res.status(200).send(result)
    }
  })
})

router.post('/burgers', (req, res, next) => {
  const newBurger = new Burger(req.body.type, req.body.price,)
  req.app.locals.db.collection('burgers').insertOne({
    newBurger
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

router.delete('/burgers/:id', (req, res, next) => {
  req.app.locals.db.collection('burgers').deleteOne({
    '_id': req.params.id
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

router.put('/burgers/:id', (req, res, next) => {
  req.app.locals.db.collection('burgers').updateOne({
    '_id': req.params.id
  }, 
  {$set:
    {
      title: req.body.title,
      username: req.body.username,
      body: req.body.body
    }
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

module.exports = router