const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

module.exports = router;