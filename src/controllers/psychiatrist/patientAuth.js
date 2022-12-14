const patient = require('../../models/patient');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const { getUrlFromImage } = require('../../utils/inputModifiers');

signup = (req, res) => {
    try {
        const errors = validationResult(req); // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                errors: errors.array()
            });
        }

        // Save patient to database
        patient.create({
            patient_name: req.body.patient_name,
            patient_address: req.body.patient_address,
            patient_phone: req.body.patient_phone || '',
            patient_email: req.body.patient_email,
            patient_password: bcrypt.hashSync(req.body.patient_password, 8),
            patient_photo: getUrlFromImage(req.body.patient_photo),
            patient_psychiatrist_id: req.decoded.psychiatrist_id
        }, (err, patient) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: "Some error occurred while creating the patient."
                });
            } else {
                res.status(201).send({
                    status: true,
                    message: 'Patient account has been created successfully!',
                    patient
                });
            }
        }
        );
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message || "Some error occurred while creating the patient account."
        });
    }
}

module.exports = {
    signup: signup
}