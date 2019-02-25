const express = require('express');
const router = express.Router();
const messagesCtrl = require('../controllers/messages');
const myUtils = require('../utilities/my_utils');

router.use(myUtils.isLoggedIn);

router.get('/', messagesCtrl.index);

router.post('/', messagesCtrl.create);
router.delete('/:id', messagesCtrl.distroy);



module.exports = router;