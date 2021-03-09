const db = require('../helpers/database');



/* - - - - Creation - - - - */

// Create new employee in database
exports.newUser = async (employee) => {
	const query = "INSERT INTO employees SET ?";
	const result = await db.exec(query, employee);

	return result;
}



/* - - - - Retrieval - - - - */

// Get list of all employees
exports.getAll = async () => {
	const query = "SELECT * FROM employees;"

	let result = await db.exec(query);

	return result;
}


// Returns employee record specified by ID
exports.getById = async (id) => {
	const query = "SELECT * FROM employees WHERE ID = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}


// Returns employee record specified by username
exports.getByUsername = async (uName) => {
	console.log(`Retrieving employee record for '${uName}'`)
	const query = 'SELECT * FROM employees WHERE username = ?;';
	let  result = await db.exec(query, uName);

	return result;
}


/* - - - - Updating - - - - */



/* - - - - Deletion - - - - */

