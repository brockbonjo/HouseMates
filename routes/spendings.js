const express = require('express');
const router = express.Router();
const myUtils = require('../utilities/my_middleware');
const spendingsCtrl = require('../controllers/spendings');

router.use(myUtils.isLoggedIn);

router.get('/', spendingsCtrl.index);
router.post('/', spendingsCtrl.create);
router.delete('/:id', spendingsCtrl.removeOne);
router.delete('/', spendingsCtrl.distroy);



module.exports = router;