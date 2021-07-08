var dao = require('./dao');

/**
 * DAO for the table USER
 */
/**
 * @param connection: (mysql.Connection)
 * @param whereCondition: (string)
 * @param values: (any[])(default: null)
 * @return (???)
 */
const selectUser = (connection, whereCondition, values = null) => {
    const query = 'SELECT * FROM `user`';
    return dao.select('selectUser', connection, query, whereCondition, values);
};

/**
 * @param connection: (mysql.Connection)
 * @param user: (User)
 * @param password: (string)(optional)
 */
const insertUser = (connection, user, password) => {
    const columns = [`email`, `name`, `password`];
    const prepare = columns
        .map(() => {
            return '?';
        })
        .join(',');
    const query = 'INSERT INTO `user` (' + columns.join(',') + ') VALUES (' + prepare + ')';
    const values = [user.email, user.name, user.password];
    // Logger.db('[user.ts] query:', query);
    return dao.insert('insertUser', connection, query, values);
};

module.exports = {
    selectUser,
    insertUser,
};
