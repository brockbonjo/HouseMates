const express = require('express');
const router = express.Router();
const myUtils = require('../utilities/my_middleware');
const settingsCtrl = require('../controllers/settings');

router.use(myUtils.isLoggedIn);

router.get('/', settingsCtrl.index);

module.exports = router;