const express = require('express');
const router = express.Router();
const hospitalController = require('../../controllers/hospital');

// Get hospital's all details by id
router.get('/:hospital_id/full-details', hospitalController.getHospitalDetailsById);

module.exports = router;