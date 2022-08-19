const patient = require('../../models/patient');
const psychiatrist = require('../../models/psychiatrist');
const hospital = require('../../models/hospital');
const { body } = require('express-validator/check');


// Check duplicate patient email and valid psychiatrist id
const checkDuplicatePatientEmailAndPsychiatristId = (req, res, next) => {
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

        // Check if psychiatrist id exists
        
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
                    try {
                        console.log(req);
                        psychiatrist.getById(req.body.patient_psychiatrist_id, (err, psychiatrist) => {
                            if (err && err.message) {
                                return res.status(500).send({
                                    status: false,
                                    message: err.message || "Some error occurred while checking psychiatrist id."
                                });
                            } else {
                                if (!psychiatrist) {
                                    return res.status(409).send({
                                        status: false,
                                        message: "Psychiatrist id does not exist."
                                    });
                                }
                                next();
                            }
                        });
                    } catch (err) {
                        return res.status(500).send({
                            status: false,
                            message: err.message || "Some error occurred while checking duplicate patient email or psychiatrist id."
                        });
                    }
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

// Check duplicate psychiatrist email and valid hospital id
const checkDuplicatePsychiatristEmailAndHospitalId = (req, res, next) => {
    try {
        if(!req.body.psychiatrist_email) {
            return res.status(409).send({
                status: false,
                message: "Psychiatrist email is required."
            });
        }

        req.body.psychiatrist_email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) ? '': res.status(409).send({
            status: false,
            message: 'Email is not valid'
        });

        // Check if valid hospital id exists in request body
        if(!req.body.psychiatrist_hospital_id || isNaN(req.body.psychiatrist_hospital_id) || Number(req.body.psychiatrist_hospital_id) < 1) {
            return res.status(409).send({
                status: false,
                message: "Valid Hospital id is required."
            });
        }

        psychiatrist.getByEmail(req.body.psychiatrist_email, (err, psychiatrist) => {
            if (err && err.message) {
                res.status(500).send({
                    status: false,
                    message: err.message || "Some error occurred while checking duplicate psychiatrist email."
                });
            } else {
                if (psychiatrist) {
                    return res.status(409).send({
                        status: false,
                        message: "Psychiatrist email already exists."
                    });
                } else {
                    // Check if hospital id exists
                    try {
                        hospital.getById(req.body.psychiatrist_hospital_id, (err, hospital) => {
                            if (err && err.message) {
                                return res.status(500).send({
                                    status: false,
                                    message: err.message || "Some error occurred while checking hospital id."
                                });
                            } else {
                                if (!hospital) {
                                    return res.status(409).send({
                                        status: false,
                                        message: "Hospital id does not exist."
                                    });
                                }
                                next();
                            }
                        }
                        );
                    } catch (err) {
                        return res.status(500).send({
                            status: false,
                            message: err.message || "Some error occurred while checking duplicate psychiatrist email or hospital id."
                        });
                    }
                }
            }
        }
        );
    } catch (err) {
        return res.status(500).send({
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
                })
            ];
        }
    }
}

// Validate psychiatrist signup fields
const validatePsychiatristSignUp = (method) => {
    console.log(method);
    switch (method) {
        case 'signup': {
            return [
                body('psychiatrist_name', 'Psychiatrist name is required').notEmpty(),
                body('psychiatrist_email', 'Psychiatrist email is not provided or invalid').isEmail(),
                body('psychiatrist_hospital_id', 'Psychiatrist hospital id is required').exists(),
                body('psychiatrist_password', 'Password is required and should be of 8-16 characters').isLength({ min: 8, max: 16 }).custom((value, { req }) => {
                    // Check if value contains at least one number and one uppercase and lowercase letter and optional special characters, otherwise, throw error
                    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
                    if (!regex.test(value)) {
                        throw new Error('Password must contain at least one number, one uppercase and one lowercase letter');
                    } else {
                        return true;
                    }
                })
            ];
        }
    }
}

// Validate psychiatrist signin fields
const validatePsychiatristSignIn = (method) => {
    switch (method) {
        case 'signin': {
            return [
                body('psychiatrist_email', 'Email is not provided or invalid').isEmail(),
                body('psychiatrist_password', 'Password is required and should be of 8-16 characters').isLength({ min: 8, max: 16 }).custom((value, { req }) => {
                    // Check if value contains at least one number and one uppercase and lowercase letter and optional special characters, otherwise, throw error
                    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
                    if (!regex.test(value)) {
                        throw new Error('Invalid password');
                    } else {
                        return true;
                    }
                })
            ];
        }
    }
}

module.exports = {
    validatePatientSignUp: validatePatientSignUp,
    validatePsychiatristSignUp: validatePsychiatristSignUp,
    checkDuplicatePatientEmailAndPsychiatristId: checkDuplicatePatientEmailAndPsychiatristId,
    checkDuplicatePsychiatristEmailAndHospitalId: checkDuplicatePsychiatristEmailAndHospitalId,
    validatePsychiatristSignIn : validatePsychiatristSignIn
}