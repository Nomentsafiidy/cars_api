var jwt = require('jsonwebtoken');
const daoUser = require('./../dao/user');
const functions = require('./../function');

module.exports = class UserService {
    /**
     * Login for an User
     * @param login: (string)
     * @param password: (string)
     * @return (Promise<hiboulib.ApiLoginUserResponse>)
     */
    login = async (login, password) => {
        const connection = functions.getConnection();
        const response = { success: false };
        const values = [login];
        const res = await daoUser.selectUser(connection, 'email = ?', values);
        if (res) {
            if (res.length === 1) {
                const user = res[0];
                // Check password
                if (await functions.checkPassword(password, user.password)) {
                    delete user.password;
                    const token = jwt.sign({ uid: user.id, exp: Math.round(new Date().getTime() / 1000 + 3600) }, process.env.JWT_KEY);
                    response.success = true;
                    response.user = user;
                    response.token = token;
                } else {
                    response.message = 'Wrong Password';
                }
            } else {
                response.message = 'Error on login';
            }
        } else {
            response.message = 'User not found';
        }
        return response;
    };

    /**
     * addUser
     * @param auth: (boolean) when user is authenticate
     * @return (Promise<ApiCarsResponse>)
     */
    addUser = async (user) => {
        console.log('** user', user);
        const connection = functions.getConnection();
        console.log('hashdd');
        const response = { success: false };
        if (user.name && user.email && user.password) {
            user.password = await functions.hashPassword(user.password);
            console.log('hash');
            const [success, error, res] = await daoUser.insertUser(connection, user);
            if (res && res.affectedRows === 1 && res.insertId) {
                response.success = true;
            }
        } else {
            throw new Error('Invalide params');
        }
        return response;
    };
};
