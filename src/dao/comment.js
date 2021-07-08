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
const insertComment = (connection, comment) => {
    const query = 'INSERT INTO `comment` (`user_id`, `car_id`, `content`, `createdAt`) VALUES (?, ?, ?, ?)';
    const values = [comment.user_id, comment.car_id, comment.content, new Date().getTime()];
    return dao.insert('insertComment', connection, query, values);
};

/**
 * Get all the activities
 * @param connection: (mysql.Connection)
 * @param whereCondition: (string)
 * @return (???)
 */
const selectComment = (connection, whereCondition) => {
    const query = 'SELECT * FROM `comment`';
    return dao.select('selectComment', connection, query, whereCondition);
};

module.exports = {
    insertComment,
    selectComment,
};
