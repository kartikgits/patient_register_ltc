const psychiatrist = require('../../models/psychiatrist');
const { validationResult } = require('express-validator/check');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../../../config/auth.config');

signup = (req, res) => {
    try {
        const errors = validationResult(req); // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                errors: errors.array()
            });
        }

        // Save psychiatrist to database
        psychiatrist.create({
            psychiatrist_name: req.body.psychiatrist_name,
            psychiatrist_hospital_id: req.body.psychiatrist_hospital_id,
            psychiatrist_email: req.body.psychiatrist_email,
            psychiatrist_password: bcrypt.hashSync(req.body.psychiatrist_password, 8)
        }, (err, psychiatrist) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: "Some error occurred while creating the psychiatrist."
                });
            } else {
                res.status(201).send({
                    status: true,
                    message: 'Psychiatrist account has been created successfully!',
                    psychiatrist: {
                        psychiatrist_id: psychiatrist.psychiatrist_id,
                        psychiatrist_name: psychiatrist.psychiatrist_name,
                        psychiatrist_email: psychiatrist.psychiatrist_email,
                        psychiatrist_hospital_id: psychiatrist.psychiatrist_hospital_id
                    }
                });
            }
        }
        );
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message || "Some error occurred while creating psychiatrist account."
        });
    }
}

signin = (req, res) => {
    try {
        const errors = validationResult(req); // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                errors: errors.array()
            });
        }

        psychiatrist.getByEmail(req.body.psychiatrist_email, (err, psychiatrist) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: "Some error occurred while retrieving psychiatrist details."
                });
            } else {
                if (!psychiatrist) {
                    res.status(401).send({
                        status: false,
                        message: "Invalid psychiatrist email or password."
                    });
                } else {
                    if (!bcrypt.compareSync(req.body.psychiatrist_password, psychiatrist.psychiatrist_password)) {
                        res.status(401).send({
                            status: false,
                            message: "Invalid psychiatrist email or password."
                        });
                    } else {
                        let token = jwt.sign({
                            psychiatrist_id: psychiatrist.psychiatrist_id
                        }, config.secret, {
                            // expiresIn: config.expiresIn
                            expiresIn: 3600
                        }
                        );
                        res.status(201).send({
                            status: true,
                            token: token,
                            psychiatrist: {
                                psychiatrist_id: psychiatrist.psychiatrist_id,
                                psychiatrist_email: psychiatrist.psychiatrist_email,
                                psychiatrist_name: psychiatrist.psychiatrist_name,
                                psychiatrist_hospital_id: psychiatrist.psychiatrist_hospital_id
                            }
                        });
                    }
                }
            }
        }
        );
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message || "Some error occurred while signing in to psychiatrist account."
        });
    }
}

module.exports = {
    signup: signup,
    signin: signin
}