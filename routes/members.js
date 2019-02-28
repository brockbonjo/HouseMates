const express = require('express');
const router = express.Router();
const membersCtrl = require('../controllers/members');
const myUtils = require('../utilities/my_middleware');
const middlewareCtrl = require('../utilities/pic_middleware');

router.use(myUtils.isLoggedIn);

router.get('/', membersCtrl.index);
router.get('/invite', membersCtrl.new);
router.get('/:id/edit', membersCtrl.edit);

router.put('/:id', middlewareCtrl.single("image"), membersCtrl.update);
router.post('/send', membersCtrl.sendInvite);
router.delete('/:id', membersCtrl.destroy);

module.exports = router;