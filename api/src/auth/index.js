const { SECRET } = require('../jwt');
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const { authorization: token } = req.headers;

    if (!token) return res.status(401).json({ auth: false, message: 'Missing token credentials'});

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate user'});
        req.user = decoded;
        next();
    })
}

function createToken(user) {
    const token = jwt.sign(user, SECRET);
    return token;
}

module.exports = {
    authenticate,
    createToken,
}