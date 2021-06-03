const db = require('../helpers/database');




/* - - - - Creation - - - - */

// Register new application on system
exports.newApp = async (application) => {
	const query = "INSERT INTO applications SET ?";

	let result = await db.exec(query, application);

	return result;
}


/* - - - - Retrieval - - - - */

// Returns all applications in database
exports.getAll = async () => {
	const query = "SELECT * FROM applications;"

	let result = await db.exec(query);

	return result;
}


// Returns application specified by ID
exports.getById = async (id) => {
	const query = "SELECT * FROM applications WHERE id = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}


/* - - - - Updating - - - - */

exports.update = async (application) => {
	const query = "UPDATE applications SET ? WHERE id = ?;";
	const data = [application, application.id];

	let result = await db.exec(query, application);

	return result;
}

/* - - - - Deletion - - - - */

exports.remove = async (id) => {
	const query = "DELETE FROM applications WHERE ID = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}
