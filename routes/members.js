const express = require('express');
const router = express.Router();
const membersCtrl = require('../controllers/members');
const myUtils = require('../utilities/my_utils');

router.use(myUtils.isLoggedIn);

router.get('/', membersCtrl.index);
router.get('/invite', membersCtrl.new);

router.post('/send', membersCtrl.sendInvite);
router.delete('/:id', membersCtrl.destroy);

module.exports = router;