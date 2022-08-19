'use strict';

let databaseConnection = require('../../config/db.config');

let Psychiatrist = function (psychiatrist) {
    this.psychiatrist_name = psychiatrist.psychiatrist_name;
    this.psychiatrist_hospital_id = psychiatrist.psychiatrist_hospital_id;
    this.psychiatrist_email = psychiatrist.psychiatrist_email;
    this.psychiatrist_password = psychiatrist.psychiatrist_password;
}

// Create new psychiatrist
Psychiatrist.create = (newPsychiatrist, result) => {
    databaseConnection.query('INSERT INTO psychiatrists SET ?', newPsychiatrist, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        result(null, {
            status: true,
            psychiatrist: {
                psychiatrist_id: res.insertId,
                psychiatrist_email: newPsychiatrist.psychiatrist_email,
                psychiatrist_name: newPsychiatrist.psychiatrist_name,
                psychiatrist_hospital_id: newPsychiatrist.psychiatrist_hospital_id
            }
        });
    }
    );
}

// Get psychiatrist by id
Psychiatrist.getById = (psychiatrist_id, result) => {
    databaseConnection.query('SELECT * FROM psychiatrists WHERE psychiatrist_id = ?', psychiatrist_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    }
    );
}

// Get psychiatrist by email
Psychiatrist.getByEmail = (psychiatrist_email, result) => {
    databaseConnection.query('SELECT * FROM psychiatrists WHERE psychiatrist_email = ?', psychiatrist_email, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found psychiatrist: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    }
    );
}

// Get all psychiatrists by hospital_id
Psychiatrist.getAllByHospitalId = (hospital_id, result) => {
    databaseConnection.query('SELECT * FROM psychiatrists WHERE psychiatrist_hospital_id = ?', hospital_id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found psychiatrists: ', res);
            result(null, res);
            return;
        }

        result('not_found', null);
    }
    );
}

// Get psychiatrist count by hospital_id
Psychiatrist.getPsychiatristsCountByHospitalId = (hospital_id, result) => {
    databaseConnection.query('SELECT COUNT(*) AS count FROM psychiatrists WHERE psychiatrist_hospital_id = ?', hospital_id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found psychiatrist count: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    }
    );
}

// Get all psychiatrists, and their patients details by hospital_id
Psychiatrist.getAllWithPatientsByHospitalId = (hospital_id, result) => {
    databaseConnection.query('SELECT * FROM psychiatrists psy inner join patients pt on psy.psychiatrist_id = pt.patient_psychiatrist_id WHERE psy.psychiatrist_hospital_id = ?', hospital_id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found psychiatrists: ', res);
            result(null, res);
            return;
        }

        result({ kind: 'not_found' }, null);
    }
    );
}

// Get patient count of all psychiatrists by hospital_id
Psychiatrist.getPatientsCountByHospitalId = (hospital_id, result) => {
    databaseConnection.query('SELECT COUNT(*) AS count FROM patients WHERE patient_psychiatrist_id IN (SELECT psychiatrist_id FROM psychiatrists WHERE psychiatrist_hospital_id = ?)', hospital_id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found patient count: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    }
    );
}

module.exports = Psychiatrist;