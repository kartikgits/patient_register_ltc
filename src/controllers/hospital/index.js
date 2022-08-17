const hospital = require('../../models/hospital');
const psychiatrist = require('../../models/psychiatrist');
const patient = require('../../models/patient');

exports.getHospitalDetailsById = (req, res) => {
    try {
        // Get hospital name by id
        hospital.getById(req.params.hospital_id, (err, hospital) => {
            if (err && err.message) {
                res.status(500).send({
                    error: 'true',
                    message: err || "Some error occurred while retrieving hospital details."
                });
            } else {
                if (!hospital) {
                    res.status(404).send({
                        message: "No hospital found with id: " + req.params.hospital_id
                    });
                } else {
                    // Get all psychiatrists by hospital id
                    psychiatrist.getAllByHospitalId(req.params.hospital_id, (err, psychiatrists) => {
                        if (err && err.message) {
                            res.status(500).send({
                                message: err.message || "Some error occurred while retrieving psychiatrist details."
                            });
                        } else {
                            let psychiatristCount = 0;
                            if (!psychiatrists) {
                                res.json({
                                    hospital_name: hospital.hospital_name,
                                    total_psychiatrist_count: 0,
                                    total_patient_count: 0,
                                    psychiatrist_details: []
                                });
                            } else {
                                // Surf all psychiatrists and get all patients by psychiatrist id
                                let psychiatrist_details = [];
                                let total_patient_count = 0;
                                for (let i = 0; i < psychiatrists.length; i++) {
                                    psychiatrist_details.push({
                                        psychiatrist_id: psychiatrists[i].psychiatrist_id,
                                        psychiatrist_name: psychiatrists[i].psychiatrist_name,
                                        patient_count: 0,
                                        patient_details: []
                                    });
                                    patient.getAllByPsychiatristId(psychiatrists[i].psychiatrist_id, (err, patients) => {
                                        if (err && err.message) {
                                            res.status(500).send({
                                                message: err.message || "Some error occurred while retrieving patient details."
                                            });
                                        } else {
                                            if (patients) {
                                                for (let j = 0; j < patients.length; j++) {
                                                    total_patient_count++;
                                                    psychiatrist_details[i].patient_count++;
                                                    psychiatrist_details[i].patient_details.push({
                                                        patient_id: patients[j].patient_id,
                                                        patient_name: patients[j].patient_name,
                                                        patient_address: patients[j].patient_address,
                                                        patient_phone: patients[j].patient_phone,
                                                        patient_email: patients[j].patient_email,
                                                        patient_photo: patients[j].patient_photo
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    );
                                }
                                res.json({
                                    hospital_name: hospital.hospital_name,
                                    total_psychiatrist_count: psychiatrists.length,
                                    total_patient_count: total_patient_count,
                                    psychiatrist_details: psychiatrist_details
                                });
                            }
                        }
                    }
                    );
                }
            }
        }
        );
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving hospital details."
        });
    }
}