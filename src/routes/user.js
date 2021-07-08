const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');

/**
 * login route
 */
router.post('/login', async (req, res) => {
    let response = { success: false };
    if (req.body && req.body.email && req.body.password) {
        const email = req.body.email;
        const password = req.body.password;
        response = await new UserService().login(email, password);
    }
    return res.send(response);
});

/**
 * @param req.body.user : (user)
 * @body provider: (string) JSON of a provider object
 */
router.post('/addUser', async (req, res) => {
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
