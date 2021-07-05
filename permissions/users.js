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
	.condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('delete').on('user', ['*'])


ac.grant('admin')
  	.execute('read').on('user')
	.execute('read').on('all_users')
	.execute('update').on('user')
	.execute('delete').on('user')
	.execute('update').on('role');



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
 * @description Checks whether user has permission to perform read operation on user data
 *
 * @param {object} req - User object of requester
 * @param {object} data - User object of data to be read
 * @returns {boolean} User has sufficient permissions to complete action
 */
exports.read = (req, data) => {
	return ac.can(req.roles[0]).context({requester:req.ID, owner:data.ID}).execute('read').sync().on('user');
};


/**
 * update
 * @description Checks whether user has permission to perform update operation on user data
 *
 * @param {object} req - User object of requester
 * @param {object} data - User object of data to be updated
 * @returns {boolean} User has sufficient permissions to complete action
 */
exports.update = (req, data) => {
	return ac.can(req.roles[0]).context({requester:req.ID, owner:data.ID}).execute('update').sync().on('user');
};


exports.updateRole = (req) => {
	return ac.can(req.roles[0]).execute('update').sync().on('role');
};


/**
 * deleteUser
 * @description Checks whether user has permission to perform delete operation on user data
 *
 * @param {object} req - User object of requester
 * @param {object} data - User object to delete
 * @returns {boolean} User has sufficient permissions to delete account
 */
exports.deleteUser = (req, data) => {
	return ac.can(req.roles[0]).context({requester: req.ID, owner:data.ID}).execute('delete').sync().on('user');
};

//exports.read = (req, data) => ac.can(req.role).context

