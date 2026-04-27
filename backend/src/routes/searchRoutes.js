const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { protect, adminOnly } = require('../middleware/authMiddleware');
const SearchController = require('../controllers/searchController');

router.post('/visual-search', upload.single('image'), SearchController.visualSearch);
module.exports = router;