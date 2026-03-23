const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// router.delete('/:id', protect, adminOnly, productController.deleteProduct);
router.get('/profile', protect, authController.getProfile); 
router.put('/update-profile', protect, authController.updateProfile);
router.put('/change-password', protect, authController.changePassword);
module.exports = router;