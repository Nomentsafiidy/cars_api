// import { loginService } from './../services/login';

const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });
/**
 * login route
 */
router.post('/login', async (req, res) => {
    console.log('login work...', req.body);
    let response = { success: false };
    if (req.body && req.body.email && req.body.password) {
        const email = req.body.email;
        const password = req.body.password;
        console.log('login work ss...');
        response = await new UserService().login(email, password);
    }
    return res.send(response);
});

/**
 * @param req.body.user : (user)
 * @body provider: (string) JSON of a provider object
 */
router.post('/add', async (req, res) => {
    let response = { success: false };
    try {
        if (req.body && req.body.user) {
            response = await new UserService().addUser(req.body.user);
        }
    } catch (err) {
        response.message = err;
    }

    return res.send(response);
});

module.exports = router;
