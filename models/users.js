const db = require('../helpers/database');



/* - - - - Creation - - - - */

// Create new user in database
exports.newUser = async (user) => {
	const query = "INSERT INTO users SET ?";
	const result = await db.exec(query, user);

	return result;
}



/* - - - - Retrieval - - - - */

// Get list of users
exports.getAll = async () => {
	const query = "SELECT * FROM users;"

	let result = await db.exec(query);

	return result;
}


// Returns user record specified by ID
exports.getById = async (id) => {
	const query = "SELECT * FROM users WHERE ID = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}

// Returns user record specified by username
exports.getByUsername = async (uName) => {
	const query = "SELECT * FROM users WHERE username = ?;";
	let  result = await db.exec(query, uName);

	return result;
}

exports.getRoles = async (id) => {

	// Get all records in role_assignments linked to user ID
	let query = "SELECT * FROM role_assignments WHERE userId = ?;";
	let data = [id];

	let result = await db.exec(query, data);

	// Get role names from roles table that match returned role ID's from previous query
	query = "SELECT role FROM roles WHERE id = ?";
	data = [];
	result.forEach (row => {
		data.push(row.roleId);
	});
	
	result = await db.exec(query, data);

	return result;
}


/* - - - - Updating - - - - */

exports.updateUser = async (user) => {
	const query = "UPDATE users SET ? WHERE ID = ?;";
	const data = [user, user.ID];

	let result = await db.exec(query, data);

	return result;
}


/* - - - - Deletion - - - - */

exports.removeDog = async (id) => {
	const query = "DELETE FROM users WHERE ID = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}


