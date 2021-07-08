const mysql = require('mysql');

/**
 * @param method_name: (string)
 * @param connection: (mysql.Connection)
 * @param prefix_query: (string)
 * @param whereCondition: (string)(default: null)
 * @param values: (any[])(default: null)
 * @return (Promise<false | T[]>)
 */
const select = (method_name, connection, prefix_query, whereCondition = null, values = null) => {
    let response = false;

    let query = prefix_query;

    if (whereCondition && whereCondition !== '') {
        query += ' WHERE ' + whereCondition;
    }

    return new Promise((resolve, reject) => {
        connection.query(query + ';', values, (err, res) => {
            if (err) {
                response = false;
                // TODO MESSAGE D'erreur
            } else {
                if (res) {
                    response = res;
                } else {
                    response = false;
                }
            }
            resolve(response);
        });
    });
};

/**
 * @param method_name: (string)
 * @param connection: (mysql.Connection)
 * @param query: (string)
 * @param values: (any[])
 * @return (Promise<[boolean, mysql.MysqlError, any]>)
 */
const insert = (method_name, connection, query, values) => {
    let response = false;
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, res) => {
            if (err) {
                connection.rollback(() => {
                    response = false;
                    resolve([response, err, res]);
                });
            } else {
                if (res) {
                    response = true;
                } else {
                    response = false;
                }
            }
            resolve([response, err, res]);
        });
    });
};

/**
 * @param method_name: (string)
 * @param connection: (mysql.Connection)
 * @param table_name: (string)
 * @param columns: (string[])
 * @param values: (any[]) 2-d array(1: row, 2: columns values)
 * @return (Promise<false> | Promise<any>)
 */
const insertMultiple = (method_name, connection, table_name, columns, values) => {
    let query = 'INSERT INTO `' + table_name + '`';
    query += '(' + columns.join(',') + ')';
    query += ' VALUES' + values.map((row) => '(' + row.map((value) => '?').join(',') + ')').join(',');
    const all_values = values.reduce((acc, val) => acc.concat(val), []); // flatten values
    return insert(method_name, connection, query, all_values);
};

/**
 * @param method_name: (string)
 * @param connection: (mysql.Connection)
 * @param query: (string)
 * @param values: (any[])
 * @return (Promise<false> | Promise<any>)
 */
const update = (method_name, connection, query, values) => {
    let response = false;
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, res) => {
            if (err) {
                connection.rollback(() => {
                    response = false;
                    // TODO MESSAGE D'erreur
                    resolve(response);
                });
                return;
            } else {
                if (res) {
                    response = res;
                } else {
                    response = false;
                }
            }
            resolve(response);
        });
    });
};

/**
 * @param method_name: (string)
 * @param connection: (mysql.Connection)
 * @param query: (string)
 * @param values: (any[])
 * @return (Promise<false> | Promise<any>)
 */
const deleteSQL = (method_name, connection, query, values) => {
    let response = false;
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, res) => {
            if (err) {
                connection.rollback(() => {
                    response = false;
                    // TODO MESSAGE D'erreur
                    resolve(response);
                });
                return;
            } else {
                if (res) {
                    response = res;
                } else {
                    response = false;
                }
            }
            resolve(response);
        });
    });
};

module.exports = {
    select,
    insert,
    insertMultiple,
    update,
    deleteSQL,
};
