const express = require('express');
const router = express.Router();
const messagesCtrl = require('../controllers/messages');
const myUtils = require('../utilities/my_middleware');
const middlewareCtrl = require('../utilities/pic_middleware');


router.use(myUtils.isLoggedIn);
router.use(myUtils.hasHousehold);

router.get('/', messagesCtrl.index);

router.post('/', middlewareCtrl.single("image"), messagesCtrl.create);
router.delete('/:id', messagesCtrl.distroy);



module.exports = router;