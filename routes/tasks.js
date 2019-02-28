const express = require('express');
const router = express.Router();
const tasksCtrl = require('../controllers/tasks');
const myUtils = require('../utilities/my_middleware');

router.use(myUtils.isLoggedIn);
router.use(myUtils.hasHousehold);

router.get('/', tasksCtrl.index);
router.get('/:id', tasksCtrl.show);
router.get('/:id/edit', tasksCtrl.edit);

router.post('/', tasksCtrl.create);
router.put('/:id', tasksCtrl.update);
router.delete('/:id', tasksCtrl.destroy);




module.exports = router;