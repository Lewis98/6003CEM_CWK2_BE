/**
 * Database interface module for license application manipulation
 *
 * @module models/applications
 * @author Lewis Stokes
 */

const db = require('../helpers/database');

/* - - - - Creation - - - - */

/**
 * newApp
 * @description Add new license application to database.
 * @param {object} application - application data packaged into JSON format
 * @returns {object} Database response
 */
exports.newApp = async (application) => {
	const query = "INSERT INTO applications SET ?";

	let result = await db.exec(query, application);

	return result;
}


/* - - - - Retrieval - - - - */

/**
 * getAll
 * @description Returns all applications in database
 * @returns {object} List of RowDataPacket objects containing license application data
 */
exports.getAll = async () => {
	const query = "SELECT * FROM applications;"

	let result = await db.exec(query);

	return result;
}


/**
 * getById
 * @description Returns a single license application specified by ID
 * @param {number} id - Numeric ID of license application to return
 * @returns {object} RowDataPacket containing specified license application information
 */
exports.getById = async (id) => {
	const query = "SELECT * FROM applications WHERE id = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}

/**
 * getByUserId
 * @description Returns all license applications made by a specified user
 * @param {number} id - Numeric ID of user to search by
 * @returns {object} List of RowDataPacket objects containing all license applications created by specified user
 */
exports.getByUserId = async (id) => {
	const query = "SELECT * FROM applications WHERE applicant_id = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}


/* - - - - Updating - - - - */

/**
 * update
 * @description Update a single license application
 * @param {object} application - License application object containing new data to update (Must also include ID for record identification)
 * @returns {object} Database response
 */
exports.update = async (application) => {
	const query = "UPDATE applications SET ? WHERE id = ?;";
	const data = [application, application.id];

	let result = await db.exec(query, application);

	return result;
}

/* - - - - Deletion - - - - */

/**
 * remove
 * @description Delete a license application specified by ID
 * @param {number} id - ID of license application record to delete
 * @returns {object} Database response
 */
exports.remove = async (id) => {
	const query = "DELETE FROM applications WHERE ID = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}
