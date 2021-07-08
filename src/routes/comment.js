const express = require('express');
const daoUser = require('./../dao/user');
const CarService = require('../services/car.service');
const carService = new CarService();
const functions = require('./../function');
const router = express.Router();
const jwt = require('jsonwebtoken');

// middleware that is specific to this router
router.use(async function auth(req, res, next) {
    console.log('middleware');
    if (req.user) {
        delete req.user;
    }
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const connection = functions.getConnection();
        const token = req.headers.authorization.split(' ')[1];
        try {
            const data = jwt.verify(token, process.env.JWT_KEY);
            if (!isNaN(data.uid)) {
                const userId = data.uid;
                console.log('userId', userId);
                const users = await daoUser.selectUser(connection, 'id = ?', userId);
                req.user = users[0];
            }
        } catch (error) {
            const code = error.httpCode || 401;
            res.status(code).json({ error });
        }
    }
    next();
});

/**
 * @param req.body.comment : (Comment)
 * @body provider: (string) JSON of a provider object
 */
router.post('/addComment', async (req, res) => {
    console.log('addComment');
    let response = { success: false };
    try {
        console.log('addComment req.user', req.user);
        if (req.user) {
            if (req.body && req.body.comment) {
                console.log(req.body.comment);
                response = await carService.addComment(req.body.comment);
            } else {
                response.message = 'Params Invalid';
            }
        } else {
            response.message = 'Permission Required';
        }
    } catch (err) {
        response.message = err;
    }

    return res.send(response);
});

module.exports = router;
