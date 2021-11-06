const router = require('express').Router();
const rootController = require('../controllers/root.controller');

router.get('/', rootController.root);

module.exports = router;