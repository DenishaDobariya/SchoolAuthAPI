const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { addPrincipal, getPrincipalById, getAllPrincipals, updatePrincipal, deletePrincipal } = require('../controllers/principalController');

router.post('/add', protect(['master']), addPrincipal); 
router.get('/:id', protect(['master', 'principal']), getPrincipalById);   
router.get('/', protect(['master']), getAllPrincipals);      
router.put('/update/:id', protect(['master']), updatePrincipal);  
router.delete('/delete/:id', protect(['master']), deletePrincipal); 

module.exports = router;