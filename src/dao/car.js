var dao = require('./dao');

/**
 * DAO for the table Car
 */
/**
 * Insert the activity
 * @param connection: (mysql.Connection)
 * @param activity: (hiboulib.Activity)
 * @return (???)
 */
const insertCar = (connection, car) => {
    const query = 'INSERT INTO `car` (`user_id`, `name`, `registration`) VALUES (?, ?, ?)';
    const values = [car.user_id, car.name, car.registration];
    return dao.insert('insertCar', connection, query, values);
};

/**
 * Get all the activities
 * @param connection: (mysql.Connection)
 * @param whereCondition: (string)
 * @return (???)
 */
const selectCar = (connection, whereCondition) => {
    const query = 'SELECT * FROM `car`';
    return dao.select('selectCar', connection, query, whereCondition);
};

module.exports = {
    insertCar,
    selectCar,
};
