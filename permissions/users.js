/**
 * Permissions module for user
 *
 * @module permissions/users
 * @author Lewis Stokes
 */


const AccessControl = require('role-acl');
const ac = new AccessControl();

// Controls setup
ac.grant('user')
	.condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read').on('user', ['*', '!password'])
	.condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update').on('user', ['password', 'lastOnline', 'email', 'profileImg', 'firstName', 'lastName'])

ac.grant('admin')
  	.execute('read').on('user');

ac.grant('admin')
	.execute('read').on('all_users');
//	.execute('update').on('all_users');



// Permission checks

/**
 * readAll
 * @description Checks whether user has permission to retrieve all users
 *
 * @param {object} req - User object of requester
 * @returns {boolean} User has sufficient permissions to complete action
 */
exports.readAll = (req) => {
	return ac.can(req.roles[0]).execute('read').sync().on('all_users');
};


/**
 * read
 * @description Checks whether user has permission to perform read operation on user
 *
 * @param {object} req - User object of requester
 * @param {object} data - User object of data to be read
 * @returns {boolean} User has sufficient permissions to complete action
 */
exports.read = (req, data) => {


	return ac.can(req.roles[0]).context({requester:req.ID, owner:data.ID}).execute('read').sync().on('user');
};

//exports.read = (req, data) => ac.can(req.role).context

