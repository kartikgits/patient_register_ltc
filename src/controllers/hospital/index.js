const hospital = require('../../models/hospital');
const psychiatrist = require('../../models/psychiatrist');
const patient = require('../../models/patient');

exports.getHospitalDetailsById = (req, res) => {
    try {
        // Get hospital name by id
        hospital.getById(req.params.hospital_id, (err, hospital) => {
            if (err && err.message) {
                res.status(500).send({
                    status: false,
                    message: "Some error occurred while retrieving hospital details."
                });
            } else {
                if (!hospital) {
                    res.status(404).send({
                        status: false,
                        message: "No hospital found with id: " + req.params.hospital_id
                    });
                } else {
                    // Get all psychiatrists by hospital id
                    psychiatrist.getAllByHospitalId(req.params.hospital_id, (err, psychiatrists) => {
                        if (err && err.message) {
                            return res.status(500).send({
                                status: false,
                                message: "Some error occurred while retrieving psychiatrist details."
                            });
                        } else {
                            if (!psychiatrists) {
                                res.json({
                                    status: true,
                                    hospital_name: hospital.hospital_name,
                                    total_psychiatrist_count: 0,
                                    total_patient_count: 0,
                                    psychiatrist_details: []
                                });
                            } else {
                                psychiatrist.getAllWithPatientsByHospitalId(req.params.hospital_id, (err, psychiatristsWithPatients) => {
                                    if (err && err.message) {
                                        return res.status(500).send({
                                            status: false,
                                            message: "Some error occurred while retrieving psychiatrist and patient details."
                                        });
                                    } else {
                                        if (!psychiatristsWithPatients) {
                                            res.json({
                                                status: true,
                                                hospital_name: hospital.hospital_name,
                                                total_psychiatrist_count: psychiatrists.length,
                                                total_patient_count: 0,
                                                psychiatrist_details: []
                                            });
                                        } else {
                                            let totalPatientCount = 0;
                                            for (let i = 0; i < psychiatristsWithPatients.length; i++) {
                                                totalPatientCount += psychiatristsWithPatients[i].total_patient_count;
                                            }
                                            res.json({
                                                status: true,
                                                hospital_name: hospital.hospital_name,
                                                total_psychiatrist_count: psychiatrists.length,
                                                total_patient_count: totalPatientCount,
                                                psychiatrist_details: psychiatristsWithPatients
                                            });
                                        }
                                    }
                                }
                                );
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
            status: false,
            message: err.message || "Some error occurred while retrieving hospital details."
        });
    }
}