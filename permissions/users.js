const AC = require('role-acl');
const ac = new AC();




ac.grant('user')
	.condition({Fn:'EQUALS', args: {'req':'$.owner'}}).execute('read').on('user', ['*', '!password'])
	.condition({Fn:'EQUALS', args: {'req':'$.owner'}}).execute('update').on('user', ['password', 'lastOnline', 'email', 'profileImg', 'firstName', 'lastName'])

ac.grant('admin')
	.extend('user')
  	.execute('read').on('user')
	.execute('update').on('all_users');


exports.readAll = (req) => {
	
	// Disallow by default
	let allowed = false;

	// For each role that the user holds
	req.roles.forEach((r) => {
		// If role is allowed access
		if (ac.can(r).execute('read').sync().on('all_users')){
			// Allow user to access / execute by setting allowed to true
			allowed = true;
		}
	})

	// Return final allowed value after loop
	return allowed;

//	ac.can(req.role).execute('read').sync().on('users')
};

exports.read = (req, data) => ac.can(req.role).context

