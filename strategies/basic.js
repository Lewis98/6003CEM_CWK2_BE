const BasicStrat = require('passport-http').BasicStrategy;
const users = require('../models/users');

const bcrypt = require('bcrypt');


const checkPass = (user, pass) => {	
	const match = bcrypt.compare(pass, user.password);

	return match;
}

const cb_basicAuth = async (uName, password, done) => {

	// Instantiate result as undefined
	let dbResult

	try {
		// retrieve result from database with username
		dbResult = await users.getByUsername(uName);
	} catch(e) {
		// If error, log to console and call callback with error (and failed auth)
		console.error(`Authentication of $(uName) failed with error: '${e}'`);
		return done(e, false);
	}
	

	// If result is defined
	if (dbResult.length) {

		// Set user to first (and hopefully only) record
		const user = dbResult[0];

		// Perform password validation
		if (checkPass(user, password)) {
			// If succeeds log a successful attempt
			console.log(`Request from ${uName} authenticated.`)

			// Get roles of user
			userRoles = await users.getRoles(user.ID);
			// Add roles to user object
			user.roles = userRoles;

			// and call callback function with no error and user record	
			return done(null, user);
		} else {
			// Else incorrect password, log failed attempt
			console.log(`Authentication failed from '$(uName)'`);
			// and return failed authentication (and no error)
			return done(null, false);
		}
	} else {
		// If no result returned, log to console
		console.log(`no records returned from database query '${uName}'`);
		// And return a failed auth (with no error)
		return done(null, false);
	}
}

const strategy = new BasicStrat(cb_basicAuth);

module.exports = strategy;
