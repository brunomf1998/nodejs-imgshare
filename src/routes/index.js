const { homeCtrl, imageCtrl } = require('../controllers')
const { Router } = require('express');

const router = Router();

router.get('/', homeCtrl.index);
router.get('/images/:image_id', imageCtrl.index);
router.post('/images', imageCtrl.create);
router.post('/images/:image_id/like', imageCtrl.like);
router.post('/images/:image_id/comment', imageCtrl.comment);
router.delete('/images/:image_id', imageCtrl.remove);

module.exports = router;