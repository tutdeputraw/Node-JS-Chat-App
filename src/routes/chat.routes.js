const router = require('express').Router();
const controller = require('../controllers/chat.controller');

// router.get('/', controller.getFriends);
router.post('/store', controller.storeChat);

module.exports = router;