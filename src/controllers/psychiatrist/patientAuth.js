const patient = require('../../models/patient');

const bcrypt = require('bcryptjs');

signup = (req, res) => {
    try {
        // Save patient to database
        patient.create({
            patient_name: req.body.patient_name,
            patient_address: req.body.patient_address,
            patient_phone: req.body.patient_phone,
            patient_email: req.body.patient_email,
            patient_password: bcrypt.hashSync(req.body.patient_password, 8)
        }, (err, patient) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the patient."
                });
            } else {
                res.send(patient);
            }
        }
        );
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the patient account."
        });
    }
}

module.exports = {
    signup: signup
}