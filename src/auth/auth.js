const jwt = require('jwt-simple');
const moment = require('moment');
const mysqlConnection = require('../DB/database');

const createToken = (user) => {

    let payload = {
        userID: user.id_user,
        name: user.name,
        userType: user.id_user_type,
        createdAt: moment().unix(),
        expiresAt: moment().add(8, 'h').unix()
    };

    return jwt.encode(payload, process.env.JWT_KEY);
};

const createRefreshToken = (user) => {

    let payload = {
        userID: user.id_user,
        name: user.name,
        userType: user.id_user_type,
        createdAt: moment().unix()
    };

    let hash = jwt.encode(payload, process.env.JWT_REFRESH_KEY);

    return hash;
};

const checkToken = (req, res, next) => {

    if (!req.headers.authorization) {

        console.error("TOKEN NOT SENT");

        return res.status(400).json({
            success: false,
            msg: 'Authorization not sent',
            code: '00000003'
        });
    };

    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];

    let payload = null;

    try {

        payload = jwt.decode(token, process.env.JWT_KEY);

    } catch (e) {

        console.error("INVALID TOKEN");

        return res.status(401).json({
            success: false,
            msg: 'Invalid token',
            code: '00000001'
        });
    };

    if (moment().unix() > payload.expiresAt) {

        console.error("EXPIRED TOKEN", payload.userID, payload.name);

        return res.status(401).json({
            success: false,
            msg: 'Expired token',
            code: '00000002'
        });
    };

    req.userID = payload.userID;
    req.userName = payload.name;
    req.userType = payload.userType;
    req.expiresAt = payload.expiresAt;

    return next();
};

const renewAuth = (refreshToken) => {

    try {

        var payload = jwt.decode(refreshToken, process.env.JWT_REFRESH_KEY);

    } catch (e) {

        console.error("INVALID REFRESH TOKEN");

        return res.status(401).json({
            success: false,
            msg: 'Invalid Refresh Token',
            code: '00000005'
        });
    };

    payload = {
        userID: payload.userID,
        name: payload.name,
        userType: payload.userType,
        createdAt: moment().unix(),
        expiresAt: moment().add(8, 'h').unix()
    };

    let hash = jwt.encode(payload, process.env.JWT_KEY);

    return hash;
};

const sessionCheck = (req, res, next) => {

    const authToken = req.headers.authorization.split(' ')[1];
    const { userID, name: userName } = req;

    mysqlConnection.query('SELECT * FROM session WHERE auth_token = ? AND online = 1', authToken, (err, sessions) => {

        if (err) return res.status(500).json({
            success: false,
            message: "Server Error",
            code: 12352957
        });

        if (sessions.length == 1) return next();

        if (sessions.length > 1) {

            console.error("SE ACTIVO EL CASO IMPOSIBLE", sessions.toString());

            mysqlConnection.query(
                'UPDATE session SET online = 0, auth_token = NULL, refresh_token = NULL WHERE authToken = ?',
                authToken,
                err => {
                    err ? console.log(err) : console.log("Forced Logout for user", userID, userName);
                });

            console.error("USER NOT LOGGED IN", userID, userName);

            return res.status(403).json({
                authorization: false,
                message: "User not logged in"
            });
        };

        console.error("USER NOT LOGGED IN", userID, userName);

        res.status(404).json({
            authorization: false,
            message: "User not logged in"
        });
    });
};

module.exports = {
    createToken,
    createRefreshToken,
    checkToken,
    renewAuth,
    sessionCheck
};