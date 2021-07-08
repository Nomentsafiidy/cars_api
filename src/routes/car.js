const CarService = require('../services/car.service');
const carService = new CarService();
///
const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const functions = require('./../function');
const daoUser = require('./../dao/user');

// middleware that is specific to this router
router.use(async function auth(req, res, next) {
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

router.get('/', async (req, res) => {
    let response = { success: false, cars: [] };
    try {
        if (req.user) {
            response = await carService.getCars(true);
        } else {
            response = await carService.getCars(false);
        }
    } catch (error) {
        response.message = '' + error;
    }
    return res.send(response);
});

router.get('/getCars', async (req, res) => {
    let response = { success: false, cars: [] };
    try {
        if (req.user) {
            response = await carService.getCars(true);
        } else {
            response = await carService.getCars(false);
        }
    } catch (error) {
        response.message = '' + error;
    }
    return res.send(response);
});

router.post('/addCar', async (req, res) => {
    let response = { success: false };

    console.log('userss', req.user);
    try {
        console.log('usersss', req.user);
        if (req.user) {
            if (req.body && req.body.car) {
                response = await carService.addCar(req.body.car);
            } else {
                response.message = 'Invalid params';
            }
        } else {
            response.message = 'Permisson required';
        }
    } catch (error) {
        response.message = '' + error;
    }
    return res.send(response);
});

module.exports = router;
