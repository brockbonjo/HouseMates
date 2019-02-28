const express = require('express');
const router = express.Router();
const shoppingCtrl = require('../controllers/shopping');
const myUtils = require('../utilities/my_middleware');

router.use(myUtils.isLoggedIn);

router.get('/', shoppingCtrl.index);
router.get('/:id/edit', shoppingCtrl.edit);

router.post('/', shoppingCtrl.create);
router.put('/:id', shoppingCtrl.update);
router.delete('/:id', shoppingCtrl.destroy);



module.exports = router;