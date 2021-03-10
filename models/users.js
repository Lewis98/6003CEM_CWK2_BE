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

exports.getByUsername = async (uName) => {
	const query = "SELECT * FROM users WHERE username = ?;";
	let  result = await db.exec(query, uName);

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

