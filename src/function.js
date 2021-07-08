const mysql = require('mysql');
const bcrypt = require('bcrypt');

let __connection = null;

/**
 * Create a database connection
 * Use getConnection to get a "static" connection
 * @return (mysql.Connection)
 */
const createConnection = () => {
    const connectionOpts = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : null,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    };
    const connection = mysql.createConnection(connectionOpts);
    return connection;
};

/**
 * Get database connection
 * @return (mysql.Connection)
 */
const getConnection = () => {
    if (__connection == null) {
        __connection = createConnection();
        __connection.on('error', (err) => {
            // Reset connection to db if connection is lost
            __connection = null;
        });
    }
    return __connection;
};

/**
 * End Connection
 * @param force: (boolean)(default: true) force connection destruction
 */
const endConnection = (force = true) => {
    if (__connection) {
        if (force) {
            __connection.destroy();
            __connection = null;
        } else {
            __connection.end();
            __connection = null;
        }
    }
};

/**
 *
 * @param passwordPlain
 * @param passwordEncrypted
 * @returns (Promise<boolean>)
 */
const checkPassword = async (passwordPlain, passwordEncrypted) => {
    return bcrypt.compare(passwordPlain, passwordEncrypted);
};

/**
 *
 * @param passwordPlain
 * @returns (Promise<string>)
 */
const hashPassword = async (passwordPlain) => {
    return bcrypt.hash(passwordPlain, 10);
};

module.exports = {
    createConnection,
    getConnection,
    endConnection,
    checkPassword,
    hashPassword,
};
