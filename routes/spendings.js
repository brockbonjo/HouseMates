const express = require('express');
const router = express.Router();
const myUtils = require('../utilities/my_utils');
const spendingsCtrl = require('../controllers/spendings');

router.use(myUtils.isLoggedIn);

router.get('/', spendingsCtrl.index);


module.exports = router;