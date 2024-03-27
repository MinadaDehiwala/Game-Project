const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkTokenValidity } = require('../Middleware/JWT');

router.post('/validatePassword', userController.validatePassword);
router.get('/profile', checkTokenValidity, userController.getProfile);
router.put('/profile/score', checkTokenValidity, userController.updateScore);
router.get('/profile/name', checkTokenValidity, userController.getName);
router.post('/signup', userController.signup);
router.post('/logout', userController.logout);
router.delete('/profile', checkTokenValidity, userController.deleteProfile);

module.exports = router;