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
		let result = await conn.query(query, data);
		
		// Wait for connection to end
		await conn.end();

		return result;
	}catch (e) {
		// Log exception (e), query and data to console if error
		console.error(e, query, data);

	//	throw 'Database query error';
	
	}
}
