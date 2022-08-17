'use strict';

let databaseConnection = require('../../config/db.config');

// `patient_id` int(11) NOT NULL AUTO_INCREMENT,
// `patient_name` varchar(255) NOT NULL,
// `patient_address` varchar(255) NOT NULL,
// `patient_phone` varchar(255) NOT NULL,
// `patient_email` varchar(255) NOT NULL,
// `patient_password` varchar(255) NOT NULL,
// `patient_photo` varchar(255) NOT NULL,
// `patient_psychiatrist_id` int(11) NOT NULL,
// `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
// `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
// PRIMARY KEY (`patient_id`),
// KEY `fk_patient_psychiatrist_id` (`patient_psychiatrist_id`),
// CONSTRAINT `fk_patient_psychiatrist_id` FOREIGN KEY (`patient_psychiatrist_id`) REFERENCES `psychiatrists` (`psychiatrist_id`) ON DELETE CASCADE ON UPDATE CASCADE

let Patient = function (patient) {
    this.patient_name = patient.patient_name;
    this.patient_address = patient.patient_address;
    this.patient_phone = patient.patient_phone;
    this.patient_email = patient.patient_email;
    this.patient_password = patient.patient_password;
    this.patient_photo = patient.patient_photo;
    this.patient_psychiatrist_id = patient.patient_psychiatrist_id;
}

// Create a new patient
Patient.create = (newPatient, result) => {
    databaseConnection.query('INSERT INTO patients SET ?', newPatient, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        console.log('Created patient: ', { id: res.insertId, ...newPatient });
        result(null, { id: res.insertId, ...newPatient });
    }
    );
}