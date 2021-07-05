/**
 * Permissions module for license applications
 *
 * @module permissions/users
 * @author Lewis Stokes
 */


const AccessControl = require('role-acl');
const ac = new AccessControl();

// Controls setup
ac.grant('user')
	.condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('create').on('application', ['*', '!status'])
	.condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read').on('application', ['*'])
	.condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update').on('application', ['*', '!status'])
	.condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('delete').on('application', ['*'])


ac.grant('admin')
	.execute('read').on('all_applications')
  	.execute('create').on('application')
	.execute('read').on('application')
	.execute('update').on('application')
	.execute('delete').on('application')



// Permission checks

/**
 * readAll
 * @description Checks whether user has permission to retrieve all license applications
 *
 * @param {object} req - User object of requester
 * @returns {boolean} User has sufficient permissions to complete action
 */
exports.readAll = (req) => {
	return ac.can(req.roles[0]).execute('read').sync().on('all_applications');
};


/**
 * read
 * @description Checks whether user has permission to perform read operation on license application
 *
 * @param {object} req - User object of requester
 * @param {object} data - License application object of data to be read
 * @returns {boolean} User has sufficient permissions to complete action
 */
exports.read = (req, data) => {
	return ac.can(req.roles[0]).context({requester:req.ID, owner:data.applicant_id}).execute('read').sync().on('application');
};


/**
 * update
 * @description Checks whether user has permission to perform update operation on license application data
 *
 * @param {object} req - User object of requester
 * @param {object} data - license application object of data to be updated
 * @returns {boolean} User has sufficient permissions to complete action
 */
exports.update = (req, data) => {
	return ac.can(req.roles[0]).context({requester:req.ID, owner:data.applicant_id}).execute('update').sync().on('application');
};



/**
 * deleteApplication
 * @description Checks whether user has permission to perform delete operation on license application data
 *
 * @param {object} req - User object of requester
 * @param {object} data - License application object to delete
 * @returns {boolean} User has sufficient permissions to delete application
 */
exports.deleteApplication = (req, data) => {
	return ac.can(req.roles[0]).context({requester: req.ID, owner:data.applicant_id}).execute('delete').sync().on('application');
};

