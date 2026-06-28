const express = require('express');
const router = express.Router();
const {
  createInstitute,
  getAllInstitutes,
  getSingleInstitute,
  updateInstitute,
  deleteInstitute
} = require('../controllers/instituteController');

// Routes mapping
router.post('/', createInstitute);
router.get('/', getAllInstitutes);
router.get('/:id', getSingleInstitute);
router.patch('/:id', updateInstitute);
router.delete('/:id', deleteInstitute);

module.exports = router;
