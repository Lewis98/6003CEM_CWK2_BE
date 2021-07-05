const db = require('../helpers/database');


/* - - - - Creation - - - - */

// Create new role in database
exports.addRole = async (role) => {
	const query = "INSERT INTO roles SET ?;";
	
	let result = await db.exec(query, role);

	return result;
}


// Creates new link in role_assignments table
// Adding an existing role to user
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
exports.getAllRoles = async () => {

	const query = "SELECT * FROM roles;";
	
	let result = await db.exec(query);

	return result;

}

exports.getRoleByName = async (name) => {
	const data = [name];
	const query = "SELECT * FROM roles WHERE role = ?;";

	let result = await db.exec(query, data);

	return result;
}

exports.getRoleByID = async (id) => {

	const data = [id];
	const query = "SELECT * FROM roles WHERE ID = ?;";
	

	let result = await db.exec(query, data);

	return result;
}

exports.getAllAssignments = async () => {
	
	// Query selects all of role assignments and joins role name from roles table for simplicity
	const query = "SELECT role_assignments.id, userId, roleId, roles.role FROM role_assignments INNER JOIN roles ON role_assignments.roleId=roles.id;";

	let result = await db.exec(query);

	return result;
}

exports.getAssignmentsByUserId = async (id) => {
	
	const data = [id];

	// Query selects all of role assignments and joins role name from roles table for simplicity
	const query = "SELECT role_assignments.id, userId, roleId, roles.role FROM role_assignments INNER JOIN roles ON role_assignments.roleId=roles.id WHERE userId = ?;";
	
	let result = await db.exec(query, data);

	return result;
}

exports.getUsersByRole = async (id) => {
	
	const data = [id];
	const query = "SELECT * FROM role_assignments WHERE roleId = ?;";
	
	let result = await db.exec(query, data);

	return result;
}

/* - - - - Update - - - - */

/* - - - - Deletion - - - - */

exports.deleteRoleById = async (id) => {

	const data = [id];
	const query = "DELETE FROM roles WHERE roleId = ?;";

	let result = await db.exec(query, data);

	return result;

}

// Unassign all roles from user
exports.clearRoles = async (id) => {
	const data = [id];
	const query = "DELETE FROM role_assignments WHERE userId = ?;";

	let result = await db.exec(query, data);

	return result;
}
