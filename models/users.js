/**
 * Database interface module for user manipulation
 *
 * @module models/users
 * @author Lewis Stokes
 *
 * @see helpers/database for underlying database interaction functionality
 */

const db = require('../helpers/database');

/* - - - - Creation - - - - */

/**
 * newUser
 * @description Creates new user record in database.
 * @param {object} user - User object parameters
 * @returns {object} Database response
 */
exports.newUser = async (user) => {
	const query = "INSERT INTO users SET ?";
	const result = await db.exec(query, user);

	return result;
}



/* - - - - Retrieval - - - - */


/**
 * getAll
 * @description Returns all user records within database
 * @returns {object} List of RowDataPacket objects containing user data
 */ 
exports.getAll = async () => {
	const query = "SELECT * FROM users;"

	let result = await db.exec(query);

	return result;
}


/**
 * getById
 * @description Returns single user record specified by ID
 * @param {number} id - id value of user to return
 * @returns {object} RowDataPacket containing specified user data
 */
exports.getById = async (id) => {
	const query = "SELECT ID, username, firstName, lastName, profileImg, email, dateRegistered FROM users WHERE ID = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}

/**
 * getByUsername
 * @description Returns single user record specified by username
 * @param {string} uName - username of user to return
 * @returns {object} RowDataPacket containing specified user data
 */
exports.getByUsername = async (uName) => {
	const query = "SELECT * FROM users WHERE username = ?;";
	let  result = await db.exec(query, uName);

	return result;
}


/* - - - - Updating - - - - */

/**
 * updateUser
 * @description Update specific user record
 * @param {object} user - user object containing data to update (Must include ID for user identification)
 * @returns {object} Database response
 */
exports.updateUser = async (user) => {
	const query = "UPDATE users SET ? WHERE ID = ?;";
	const data = [user, user.ID];

	let result = await db.exec(query, data);

	return result;
}


/* - - - - Deletion - - - - */

/**
 * removeUser
 * @description Delete user record from database
 * @param {number} id - User ID of user to delete
 * @returns {object} Database response
 */
exports.removeUser = async (id) => {
	const query = "DELETE FROM users WHERE ID = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}


