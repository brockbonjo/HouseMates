const express = require('express');
const router = express.Router();
const passport = require('passport');
const householdsCtrl = require('../controllers/households');

router.get('/', isLoggedIn , hasHousehold, householdsCtrl.index);
router.get('/new', isLoggedIn, householdsCtrl.new);

router.post('/', isLoggedIn, householdsCtrl.create);
router.post('/join', isLoggedIn, householdsCtrl.join);

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated() ) {
    return next();
  }
  res.redirect('/');
}

function hasHousehold(req, res, next) {
  if(req.user.household) {
    return next();
  }
  res.redirect('/household/new');
}
  

module.exports = router;
