const express = require('express');
const router = express.Router();

const user_service = require("../service/user-service")

/* GET users listing. */
router.post('/new', function(req, res, next){
  user_service.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
      .catch(err => next(err));
});
router.post('/login', function(req, res, next){
  user_service.create(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
});

module.exports = router;
