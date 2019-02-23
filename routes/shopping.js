const express = require('express');
const router = express.Router();
const shoppingCtrl = require('../controllers/shopping');
const myUtils = require('../utilities/my_utils');

router.use(myUtils.isLoggedIn);

router.get('/', shoppingCtrl.index);

router.post('/', shoppingCtrl.create);
router.post('/additem', shoppingCtrl.additem);


module.exports = router;