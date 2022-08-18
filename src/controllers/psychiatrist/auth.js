const psychiatrist = require('../../models/psychiatrist');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../../../config/auth.config');

signup = (req, res) => {
    try {
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
                    message: err.message || "Some error occurred while creating the psychiatrist."
                });
            } else {
                res.send(psychiatrist);
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
        psychiatrist.getByEmail(req.body.psychiatrist_email, (err, psychiatrist) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: err.message || "Some error occurred while retrieving psychiatrist details."
                });
            } else {
                if (!psychiatrist) {
                    res.status(401).send({
                        message: "Invalid psychiatrist email or password."
                    });
                } else {
                    if (!bcrypt.compareSync(req.body.psychiatrist_password, psychiatrist.psychiatrist_password)) {
                        res.status(401).send({
                            message: "Invalid psychiatrist email or password."
                        });
                    } else {
                        let token = jwt.sign({
                            psychiatrist_id: psychiatrist.psychiatrist_id
                        }, config.secret, {
                            expiresIn: config.expiresIn
                        }
                        );
                        res.send({
                            token: token,
                            psychiatrist: psychiatrist
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