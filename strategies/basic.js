const BasicStrat = require('passport-http').BasicStrategy;
const users = require('../models/users');


const checkPass = (user, pass) => {
	return user.password === pass;
}

const cb_basicAuth = async (uName, password, done) => {

	let dbResult

	try {
		let dbResult = users.getByUsername(uName);
	} catch(e) {
		console.error(`Authentication of $(uName) failed with error: '${e}'`);
		return done(e, null);
	}

	if (dbResult.length == 1) {
		const user = result[0];
		if (checkPass(user, password)) {
			console.log(`Request from ${uName} authenticated.`)
			return done(null, user);
		} else {
			console.log(`Authentication failed from '$(uName)'`);
			return done(null, false);
		}
	} else {
		console.log(`'${dbResult.length}' records returned from database query '${uName}'`);
		return done(null, false);
	}
}

const strategy = new BasicStrat(cb_basicAuth);

module.exports = strategy;
