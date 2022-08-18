const { authJwt } = require('../../middlewares/psychiatrist');
const { verifySignUp } = require('../../middlewares/psychiatrist');
const { patientAuth } = require('../../controllers/psychiatrist');

// Signup a new patient
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    }
    );
    // app.post('/auth/patient-signup', [authJwt.verifyToken, verifySignUp.checkDuplicatePatientEmail], patientAuth.signup);
    app.post('/auth/patient-signup', [verifySignUp.validatePatientSignUp('signup'), verifySignUp.checkDuplicatePatientEmail], patientAuth.signup);
}