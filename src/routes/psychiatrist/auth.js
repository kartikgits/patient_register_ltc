const { verifySignUp } = require('../../middlewares/psychiatrist');
const controller = require('../../controllers/psychiatrist');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    }
    );

    app.post('/signup', [verifySignUp.validatePsychiatristSignUp('signup'), verifySignUp.checkDuplicatePsychiatristEmailAndHospitalId], controller.auth.signup);
    app.post('/signin', [verifySignUp.validatePsychiatristSignIn('signin')], controller.auth.signin);
};