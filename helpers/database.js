/**
 * Database interface module
 *
 * @module helpers/database
 * @author Lewis Stokes
 */


const mysql = require('promise-mysql');
const cfgFile = require('../config');


/**
 * exec
 * @description Execute SQL query on database
 * @param {string} query - Query string to execute
 * @param {*} data - Data for insertion into query string
 */
exports.exec = async (query, data) => {
	try {
		// Establish connection
		const conn = await mysql.createConnection(cfgFile.config);

		// Run query on database
		let result = await conn.query(query, data).catch((e) => {
			console.error(e);
		});
		
		// Wait for connection to end
		await conn.end();
	
		// Return retrieved data
		return result;
	} catch (err) {
		// Log exception (e), query and data to console if error
		console.error(err.message, query, data);

		throw new DB_Exception('Database query error', err.code);
	
	}
}

/**
 * Custom exception object for catching promise rejection
 * @param {string} msg - Error message
 * @param {number} err_code - Error code
 */
function DB_Exception(msg, err_code) {
	this.message = msg;
	this.code = err_code;
	this.name = "DB_Exception";
}
