const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/sign-up', userController.signUp);
router.get('/sign-in/:email/:password', userController.signIn);
router.get('/sign-out/:id', userController.signOut);

module.exports = router;