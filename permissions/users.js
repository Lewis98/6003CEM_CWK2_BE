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

exports.readAll = (req) => {
	return ac.can(req.roles[0]).execute('read').sync().on('all_users');
};

exports.read = (req, data) => {
	return ac.can(req.roles[0]).context({requester:req.ID, owner:data.ID}).execute('read').sync().on('user');
};

exports.read = (req, data) => ac.can(req.role).context

