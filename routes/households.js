const express = require('express');
const router = express.Router();
const passport = require('passport');
const householdsCtrl = require('../controllers/households');
const myUtils = require('../utilities/my_utils');

router.use(myUtils.isLoggedIn);

router.get('/', hasHousehold, householdsCtrl.index);
router.get('/new', householdsCtrl.new);

router.post('/', householdsCtrl.create);
router.post('/join', householdsCtrl.join);


/*---------------------------------*/

function hasHousehold(req, res, next) {
  if(req.user.household) {
    return next();
  }
  res.redirect('/household/new');
}
  

module.exports = router;
