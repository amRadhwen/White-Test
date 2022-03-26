const jwt = require('jsonwebtoken');
const {User} = require("../models/userModel");
const asyncHandler = require("express-async-handler");


const protectUser = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({error: "Not authorized, token failed"});
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401).json({error: "Not authorized, no token"});
        throw new Error('Not authorized, no token');
    }
});

const protectAdmin = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);
            req.user = await User.findById(decoded.id).select('-password');
            if (req.user && req.user.is_admin) {
                next()
            }
            else {
                res.status(401).json({Error: "Not authorized as admin"});
                throw new Error('Not authorized as an admin')
            }
        } catch (error) {
            res.status(401).json({error: "Not authorized, token failed"});
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401).json({error: "Not authorized, no token"});
        throw new Error('Not authorized, no token');
    }
});

module.exports = {protectUser, protectAdmin};