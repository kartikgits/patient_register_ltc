'use strict';

let databaseConnection = require('../../config/db.config');

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
        result(null, { 
            patient_id: res.insertId,
            patient_email: newPatient.patient_email,
            patient_name: newPatient.patient_name,
            patient_address: newPatient.patient_address,
            patient_phone: newPatient.patient_phone,
            patient_photo: newPatient.patient_photo,
            patient_psychiatrist_id: newPatient.patient_psychiatrist_id
         });
    }
    );
}

// Find a patient by email
Patient.findPatientByEmail = (email, result) => {
    databaseConnection.query('SELECT * FROM patients WHERE patient_email = ?', email, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        
        if (res.length) {
            console.log('Found patient: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    }
    );
}

// Get all patients by psychiatrist_id
Patient.getAllByPsychiatristId = (psychiatrist_id, result) => {
    databaseConnection.query('SELECT * FROM patients WHERE patient_psychiatrist_id = ?', psychiatrist_id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found patients: ', res);
            result(null, res);
            return;
        }

        result({ kind: 'not_found' }, null);
    }
    );
}

module.exports = Patient;