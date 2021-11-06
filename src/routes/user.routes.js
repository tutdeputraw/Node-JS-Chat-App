const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/sign-out', userController.signOut);

module.exports = router;