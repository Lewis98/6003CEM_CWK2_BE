const mysql = require('promise-mysql');
const cfgFile = require('../config');


// Execute query
exports.exec = async function exec (query, data) {
	try {
		// Establish connection
		const conn = await mysql.createConnection(cfgFile.config);

		// Run query on database
		let result = await conn.query(query, data);
		
		// Wait for connection to end
		await conn.end();
	
		// Return retrieved data
		return result;
	}catch (e) {
		// Log exception (e), query and data to console
		console.error(e, query, data);

		throw 'Database query error';
	
	}
}
