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


/**
 * newImage
 * @description Adds image record to the images table
 * @param {object} img - image record to create
 * @returns {object} Database response
 */
exports.newImage = async (img) => {
	const query = "INSERT INTO images SET ?";

	let result = await db.exec(query, img);

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

/**
 * getImages
 * @description Returns all images with specified app_id
 * @param {number} id - Corresponds to image's app_id value to search by
 * @returns {object} List of RowDataPacket objects containing application images in Base64 format
 */
exports.getImages = async (id) => {
	const query = "SELECT * FROM images WHERE app_id = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}


/* - - - - Updating - - - - */

/**
 * update
 * @description Update a single license application
 * @param {object} application - License application object containing new data to update (Must also include ID for record identification)
 * @param {number} id - Application ID to update
 * @returns {object} Database response
 */
exports.update = async (application, id) => {
	console.log(id);
	const query = "UPDATE applications SET ? WHERE id = " + id + ";";
	const data = [application];

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
