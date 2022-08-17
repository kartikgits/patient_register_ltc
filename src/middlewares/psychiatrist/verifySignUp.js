const patient = require('../../models/patient');
const psychiatrist = require('../../models/psychiatrist');

// Check duplicate patient email
const checkDuplicatePatientEmail = (req, res, next) => {
    try {
        patient.getByEmail(req.body.patient_email, (err, patient) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while checking duplicate patient email."
                });
            } else {
                if (patient) {
                    res.status(409).send({
                        message: "Patient email already exists."
                    });
                } else {
                    next();
                }
            }
        }
        );
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while checking duplicate patient email."
        });
    }
}

// Check duplicate psychiatrist email
const checkDuplicatePsychiatristEmail = (req, res, next) => {
    try {
        psychiatrist.getByEmail(req.body.psychiatrist_email, (err, psychiatrist) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while checking duplicate psychiatrist email."
                });
            } else {
                if (psychiatrist) {
                    res.status(409).send({
                        message: "Psychiatrist email already exists."
                    });
                } else {
                    next();
                }
            }
        }
        );
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while checking duplicate psychiatrist email."
        });
    }
}

module.exports = {
    checkDuplicatePatientEmail: checkDuplicatePatientEmail,
    checkDuplicatePsychiatristEmail: checkDuplicatePsychiatristEmail
}