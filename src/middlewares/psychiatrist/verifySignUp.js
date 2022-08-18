const patient = require('../../models/patient');
const psychiatrist = require('../../models/psychiatrist');
const { body } = require('express-validator/check');

// Check duplicate patient email
const checkDuplicatePatientEmail = (req, res, next) => {
    try {
        if(!req.body.patient_email) {
            return res.status(409).send({
                status: false,
                message: "Patient email is required."
            });
        }

        req.body.patient_email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) ? '': res.status(409).send({
            status: false,
            message: 'Email is not valid'
        });
        patient.findPatientByEmail(req.body.patient_email, (err, patient) => {
            if (err && err.message) {
                return res.status(500).send({
                    status: false,
                    message: err.message || "Some error occurred while checking duplicate patient email."
                });
            } else {
                if (patient) {
                    return res.status(409).send({
                        status: false,
                        message: "Patient email already exists."
                    });
                } else {
                    next();
                }
            }
        }
        );
    } catch (err) {
        return res.status(500).send({
            status: false,
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
                    status: false,
                    message: err.message || "Some error occurred while checking duplicate psychiatrist email."
                });
            } else {
                if (psychiatrist) {
                    res.status(409).send({
                        status: false,
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
            status: false,
            message: err.message || "Some error occurred while checking duplicate psychiatrist email."
        });
    }
}

// Validate patient signup fields
const validatePatientSignUp = (method) => {
    switch (method) {
        case 'signup': {
            return [
                body('patient_name', 'Patient name is required').notEmpty(),
                body('patient_email', 'Patient email is not provided or invalid').exists().isEmail(),
                body('patient_address', 'Patient address is required and should be for min 10 characters').isLength({ min: 10 }),
                body('patient_phone', 'Patient phone provided is invalid').optional({checkFalsy: true}).custom(value => {
                    // If value is not provided, then set it to empty string
                    if (!value || value.length === 0) {
                        return '';
                    }
                    
                    // If value is provided, the check correct format with international phone number format
                    if(value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                        return value;
                    }

                    throw new Error('Invalid phone number format');
                }),
                body('patient_password', 'Patient password is required and should be of 8-16 characters').isLength({ min: 8, max: 16 }).custom((value, { req }) => {
                    // Check if value contains at least one number and one uppercase and lowercase letter and optional special characters, otherwise, throw error
                    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
                    if (!regex.test(value)) {
                        throw new Error('Password must contain at least one number, one uppercase and one lowercase letter');
                    } else {
                        return value;
                    }
                }),
                // body('patient_photo', 'Patient photo is required').exists().notEmpty().custom((value, { req }) => {
                //     // Check if value is a valid image url, otherwise, throw error
                //     let regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
                //     if (!regex.test(value)) {
                //         throw new Error('Patient photo is not a valid image url.');
                //     } else {
                //         return value;
                //     }
                // })
            ];
        }
    }
}

module.exports = {
    validatePatientSignUp: validatePatientSignUp,
    checkDuplicatePatientEmail: checkDuplicatePatientEmail,
    checkDuplicatePsychiatristEmail: checkDuplicatePsychiatristEmail
}