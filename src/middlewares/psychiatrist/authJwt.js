const jwt = require('jsonwebtoken');
const config = require('../../../config/auth.config');

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({
            status: false,
            message: 'No token provided.'
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                status: false,
                message: 'Invalid token.'
            });
        }
        req.decoded = decoded;
        next();
    }
    );
}

module.exports = {
    verifyToken: verifyToken
}