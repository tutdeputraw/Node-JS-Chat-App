const router = require('express').Router();
const controller = require('../controllers/friend.controller');

router.get('/', controller.getFriends);
router.post('/add', controller.addFriend);

module.exports = router;