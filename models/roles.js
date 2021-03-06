/**
 * Database interface module for user role manipulation
 *
 * @module models/roles
 * @author Lewis Stokes
 */

const db = require('../helpers/database');

/* - - - - Creation - - - - */

/**
 * addRole
 * @description Create new role in database
 * @param {object} role - Role object containing details of role
 * @returns {object} Database response
 */
exports.addRole = async (role) => {
	const query = "INSERT INTO roles SET ?;";
	
	let result = await db.exec(query, role);

	return result;
}


/**
 * assignRole
 * @description Creates a new record within the role_assignments table, assigning a role to a user
 * @param {number} id - ID of user to assign role to
 * @param {number} roleId - ID of role in roles table to assign to user
 * @returns {object} Database response
 */
exports.assignRole = async (id, roleId) => {

	const data = {
		userId: id,
		roleId: roleId
	};

	const query = "INSERT INTO role_assignments SET ?;";

	let result = await db.exec(query, data);

	return result;

}

/* - - - - Retrieval - - - - */
/**
 * getAllRoles
 * @description Returns all unique roles in roles table of database.
 * @returns {object} List of RowDataPacket objects containing role data
 */
exports.getAllRoles = async () => {

	const query = "SELECT * FROM roles;";
	
	let result = await db.exec(query);

	return result;

}

/**
 * getRoleByName
 * @description Return role from roles table specified by role name
 * @param {string} name - Name of role to return
 * @returns {object} RowDataPacket object containing data of specified role
 */
exports.getRoleByName = async (name) => {
	const data = [name];
	const query = "SELECT * FROM roles WHERE role = ?;";

	let result = await db.exec(query, data);

	return result;
}

/**
 * getRoleById
 * @description Return role from roles table specified by role ID
 * @param {number} id - Numeric ID of role to return
 * @returns {object} RowDataPacket object containing data of specified role
 */
exports.getRoleByID = async (id) => {

	const data = [id];
	const query = "SELECT * FROM roles WHERE ID = ?;";
	

	let result = await db.exec(query, data);

	return result;
}

/**
 * getAllAssignments
 * @description Return all records in the role_assignments table, displaying every user's assigned role.
 * @returns {object} List of RowDataPacket objects containing role assignment data
 */
exports.getAllAssignments = async () => {
	
	// Query selects all of role assignments and joins role name from roles table for simplicity
	const query = "SELECT role_assignments.id, userId, roleId, roles.role FROM role_assignments INNER JOIN roles ON role_assignments.roleId=roles.id;";

	let result = await db.exec(query);

	return result;
}

/**
 * getAssignmentsByUserId
 * @description Return all roles assigned to a single user specified by user ID
 * @param {number} id - User ID to search for roles assigned to
 * @returns {object} List of RowDataPacket objects containing role assignment data for specified user
 */
exports.getAssignmentsByUserId = async (id) => {
	
	const data = [id];

	// Query selects all of role assignments and joins role name from roles table for simplicity
	const query = "SELECT role_assignments.id, userId, roleId, roles.role FROM role_assignments INNER JOIN roles ON role_assignments.roleId=roles.id WHERE userId = ?;";
	
	let result = await db.exec(query, data);

	return result;
}


/**
 * getUsersByRole
 * @description Return all role assignment data for specified role
 * @param {number} id - Role ID to search for users assigned to
 * @returns {object} List of RowDataPacket objects containing role assignment data for specified role
 */
exports.getUsersByRole = async (id) => {
	
	const data = [id];
	const query = "SELECT * FROM role_assignments WHERE roleId = ?;";
	
	let result = await db.exec(query, data);

	return result;
}

/* - - - - Update - - - - */

/* - - - - Deletion - - - - */

/**
 * deleteRoleById
 * @description Remove role from roles table in database.
 * @param {number} id - ID of role to be removed
 * @returns {object} Database response
 */
exports.deleteRoleById = async (id) => {

	const data = [id];
	const query = "DELETE FROM roles WHERE roleId = ?;";

	let result = await db.exec(query, data);

	return result;

}

/**
 * clearRoles
 * @description Remove all role assignment data for user specified by ID
 * @param {number} id - ID of user to remove role assignments for
 * @returns {object} Database response
 */
exports.clearRoles = async (id) => {
	const data = [id];
	const query = "DELETE FROM role_assignments WHERE userId = ?;";

	let result = await db.exec(query, data);

	return result;
}
