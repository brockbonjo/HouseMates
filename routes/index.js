const express = require('express');
const router = express.Router();
const passport = require('passport');
const indexCtrl = require('../controllers/index');


/* GET home page. */
router.get('/', indexCtrl.index);

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile']
  }));
router.get('/oauth2callback', passport.authenticate(
  'google', 
  {
    successRedirect: '/household',
    failureRedirect: '/'
  }
));
router.get('/logout', indexCtrl.logout);




module.exports = router;


