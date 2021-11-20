const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.search);
router.post('/sign-up', controller.signUp);
router.get('/sign-in/:email/:password', controller.signIn);
router.get('/sign-out/:id', controller.signOut);
router.get('/friends', controller.getFriends);

module.exports = router;