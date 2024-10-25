const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getUserById} = require('../controllers/masterController');

router.get('/:id', protect(['master']), getUserById);   

module.exports = router;
