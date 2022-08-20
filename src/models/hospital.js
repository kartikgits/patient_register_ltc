'use strict';

let databaseConnection = require('../../config/db.config');

let Hospital = function (hospital) {
    this.hospital_name = hospital.hospital_name;
}

// Get hospital by id
Hospital.getById = (hospital_id, result) => {
    databaseConnection.query('SELECT * FROM hospitals WHERE hospital_id = ?', hospital_id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result('Record Not Found', null);
    }
    );
}

module.exports = Hospital;