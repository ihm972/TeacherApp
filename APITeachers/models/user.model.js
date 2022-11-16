const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getUserById = (userId) => {
    return executeQueryOne('select * from users where id = ?', [userId]);
}; 

const createUser = ({ name, surname, email, password, role_id }) => {
    return executeQuery('INSERT INTO users (name, surname, email, password, role_id) VALUES (?, ?, ?, ?, ?)', [name, surname, email, password, role_id]);
};

const updateUser = (userId, { name, surname, email, password, role_id }) => {
    return executeQuery('UPDATE users SET name = ?, surname = ?, email = ?, password = ?, role_id = ? WHERE id = ?', [name, surname, email, password, role_id, userId]);
};

module.exports = {
    getUserById, createUser, updateUser
}