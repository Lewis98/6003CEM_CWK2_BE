/**
 * Routes module for user
 *
 * @module routes/users
 * @author Lewis Stokes
 */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');


const model = require('../models/users');
const model_roles = require('../models/roles'); // Used for role manipulation

const authenticate = require('../controllers/auth');
const bcrypt = require('bcrypt');

const {validate} = require('../controllers/validation');

const can = require('../permissions/users');


const prefix = '/api/v1/users';
const router = Router({prefix: prefix});


router.get('/', authenticate, getAll);
router.get('/:id([0-9]{1,})', authenticate, getById);

router.post('/', validate("user"), bodyParser(), newUser); // User Registration
router.post('/login', authenticate, login); // User login
router.post('/role/:id([0-9]{1,})', authenticate, bodyParser(), changeRole); // Change role

router.put('/:id([0-9]{1,})', authenticate, validate("user"), updateUser);
router.del('/:id([0-9]{1,})', authenticate, validate("user"), deleteUser);

/** 
 * getAll
 * @description Returns all users from DB.
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback 
 */
async function getAll(ctx, next){
	
	
	// Get permission status based on user role
	const perm  = can.readAll(ctx.state.user);
	// If permission is not granted
	if (!perm.granted){
		ctx.status = 403; // Return forbidden status code
		return; // Return to prevent retrieval of data
	}
	
	// Retrieve all users from db using model
	let users = await model.getAll();

	// if result is not empty
	if (users.length) {
		// Return result as response body
		ctx.body = users;
	}else{
		// Return internal server error and error to console
		ctx.status = 500;
		console.error('Failed to get all users from database - no records found');
	}
}


/** 
 * getById
 * @description Returns single user from DB identified by ID.
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback 
 */
async function getById(ctx, next){
	let id = ctx.params.id;
	
	// Retrieve all users from db using model
	let user = await model.getById(id);

	// Get permission status based on user role
	const perm  = can.read(ctx.state.user, user[0]);
	// If permission is not granted
	if (!perm.granted){
		ctx.status = 403; // Return forbidden status code
		return; // Return to prevent retrieval of data
	}


	// if result is not empty
	if (user.length) {
		const roleAssignment = await model_roles.getAssignmentsByUserId(user[0].ID);
		if(roleAssignment.length){
			user[0].roles = [roleAssignment[0].role];
		}else{
			ctx.status = 500;
		}


		// Return result as response body
		ctx.body = user;
	}else{
		// Otherwise send not found error response 
		ctx.status = 404;
	}

}

/** 
 * newUser
 * @description Creates new user entry in database
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback 
 */
async function newUser(ctx, next){

	// Get body of request
	const body = ctx.request.body;

	// Set role if none
	let role;
	if (body.role == undefined) {
		role = 1;
	} else {
		role = 1 //body.role; // Only allow registration as user
		delete body.role;     // Accounts are updated by administrator
	}

	console.log("Registration request recieved:")
	console.log(body);

	
	// Endpoint works but returns 404 on success 
	ctx.status = 201;


	
	// Generate Salt (10 rounds of generation)
	body.passSalt = await bcrypt.genSalt(10);

	// Hash password and pass error or result to function
	await bcrypt.hash(body.password, body.passSalt, async (e, hash) => {
		if (!e) {
			
			// Store hash as new password field
			body.password = hash;

			// Attempt to add user to database using model
			const result = await model.newUser(body);
			
			// If successful
			if (result) {
				// Log success
				console.log (`'${body.username}' successfully created in database with values:`)
				console.log (body);

				// Get ID from new record
				const id = result.insertId;
				
				// Add role to role assignment table
				const roleAssignment = await model_roles.assignRole(id, role);
				
				if (roleAssignment == undefined) {
					// - - - Failed to create role for user - - - 
					// Delete user record
					await model.removeUser(id);
					// Log error to console
					console.error(`Failed to create role:'${role}' for user:'${body.username}'`);
					// Serve internal server error to user
					ctx.status = 500;
				}
				
				
				// Return success and new ID
				ctx.status = 201;
				ctx.body = {ID: id};

			} else {
				// Else log error and display body to console
				console.error(`Failed to create user '${body.username}' to database with data: `)
				console.error(body);

				// And return internal server error to user
				ctx.status = 500;
				ctx.body = {message: "Failed to create user"};
			}
		} else {

			// If hash fails log to console and return internal server error
			console.error(`Error hashing: '${e}'`);
			ctx.status = 500;
			ctx.body = {message: "Failed to create user"};
		}
	});

}


/**
 * updateUser
 * @description Updates user record with information provided in request body
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback
 */
async function updateUser(ctx, next){
	
	// Retrieve id of user from URI parameters
	const id = ctx.params.id;
	// Retrieve data from body of request
	const body = ctx.request.body;
	
	// Retrieve record to update from database
	let record = await model.getById(id);
	
	// If user doesn't exist
	if (!record.length){
		// Send 404 response
		ctx.status = 404;
		ctx.body = {ID: null};
		return;
	};
	
	// Get permission status based on user role
	const perm  = can.update(ctx.state.user, record[0]);
	// If permission is not granted
	if (!perm.granted){
		ctx.status = 403; // Return forbidden status code
		return; // Return to prevent retrieval of data
	}

	// Otherwise user exists
	
	//Overwrite data specified in body but retain left over data from original record
	Object.assign(record, body);

	const result = await model.updateUser(record);

	// If response indicates rows changed
	if (result.affectedRows) {
		// Return success to front end
		ctx.status = 200;
		ctx.body = {ID: id};
	}else{
		// Else return internal server error
		ctx.status = 500;
	}
}

/**
 * changeRole
 * @description Changes user role
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback
 */
async function changeRole(ctx, next){
	// Retrieve id of user from URI parameters
	const id = ctx.params.id;
	// Retrieve data from body of request
	const body = ctx.request.body;

	console.log(id);
	
	// Retrieve record to update from database
	let record = await model_roles.getRoleByName(body.role);
	
	// If role doesn't exist
	if (!record.length){
		// Send 404 response
		ctx.status = 404;
		ctx.body = {ID: null};
		return;
	};
	
	// Get permission status based on user role
	const perm  = can.updateRole(ctx.state.user, record[0]);
	// If permission is not granted
	if (!perm.granted){
		ctx.status = 403; // Return forbidden status code
		return; // Return to prevent retrieval of data
	}

	// Otherwise role exists
	
	await model_roles.clearRoles(id);

	const result = await model_roles.assignRole(id, record[0].id);

	

	// If response indicates rows changed
	if (result.affectedRows) {
		// Return success to front end
		ctx.status = 200;
		ctx.body = {ID: id};
	}else{
		// Else return internal server error
		ctx.status = 500;
	}
}

/**
 * deleteUser
 * @description Deletes user record specified by id in URI
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback
 */
async function deleteUser(ctx, next){

	// Retrieve id from URI parameters
	const id = ctx.params.id;
	
	// Retrieve user to be deleted for permissions check
	let user = await model.getById(id);

	// If no results returned
	if (!(user.length)) {
		// Return 404 error 
		ctx.status = 404;
		ctx.body = {ID: null}
	}
	
	// Get permission status based on user role
	const perm  = can.deleteUser(ctx.state.user, user[0]);
	// If permission is not granted
	if (!perm.granted){
		ctx.status = 403; // Return forbidden status code
		return; // Return to prevent retrieval of data
	}

	// Delete user record
	const result = await model.deleteUser(id);

	// If there are affected rows
	if (result.affectedRows){
		// Return success
		ctx.status = 200;
		ctx.body = {ID: id}
	}else{
		// Else return internal server error
		ctx.status = 500; 
		ctx.body = {ID: null};
		return;
	}

}

/** 
 * login
 * @description Returns user information stored in context state user object (populated throughout validation module)
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback 
 * @see strategies/basic for authentication used by function
 */
async function login(ctx, next) {

	console.log(ctx.state.user);

	const {ID, firstName, lastName, username, email, profileImg, roles} = ctx.state.user
	const links = {
		self: `${ctx.protocol}://${ctx.host}${prefix}/${ID}`
	}

	ctx.body = {ID, firstName, lastName, username, email, profileImg, roles};

}

/** User Routes */
module.exports = router;
