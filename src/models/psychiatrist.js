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
            console.log(err);
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
            result(null, res);
            return;
        }

        result('not_found', null);
    }
    );
}

// Get all psychiatrists, and their patients details by hospital_id
Psychiatrist.getAllWithPatientsByHospitalId = (hospital_id, result) => {
    databaseConnection.query('SELECT * FROM psychiatrists psy left join patients pt on psy.psychiatrist_id = pt.patient_psychiatrist_id WHERE psy.psychiatrist_hospital_id = ?', hospital_id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            let psy_arr = [];
            
            for(let i = 0; i < res.length; i++) {
                if(psy_arr[res[i].psychiatrist_id] != undefined) {
                    psy_arr[res[i].psychiatrist_id].patient_details = psy_arr[res[i].psychiatrist_id].patient_details.concat({
                        patient_id: res[i].patient_id,
                        patient_name: res[i].patient_name,
                        patient_address: res[i].patient_address,
                        patient_phone: res[i].patient_phone,
                        patient_email: res[i].patient_email,
                        patient_photo: res[i].patient_photo
                    });
                    psy_arr[res[i].psychiatrist_id].total_patient_count++;
                } else {
                    psy_arr[res[i].psychiatrist_id] = {
                        psychiatrist_id: res[i].psychiatrist_id,
                        psychiatrist_name: res[i].psychiatrist_name,
                        // If patient_id is null, then total_patient_count is 0
                        total_patient_count: res[i].patient_id ? 1 : 0,
                        // If patient_id is null, then patient_details is an empty array
                        patient_details: res[i].patient_id ? [{
                            patient_id: res[i].patient_id,
                            patient_name: res[i].patient_name,
                            patient_address: res[i].patient_address,
                            patient_phone: res[i].patient_phone,
                            patient_email: res[i].patient_email,
                            patient_photo: res[i].patient_photo
                        }] : []
                    };
                }
            }
    
            // Clean up psy_arr to remove empty items
            let len = psy_arr.length;
            for(let i = 0; i < len; i++) {
                psy_arr[i] && psy_arr.push(psy_arr[i]);
            }
            psy_arr.splice(0, len);
    
            result(null, psy_arr);
            return;
        }

        result({ kind: 'not_found' }, null);
    }
    );
}

module.exports = Psychiatrist;