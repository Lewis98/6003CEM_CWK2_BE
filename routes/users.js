const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/users');

const router = Router({prefix: '/api/v1/users'});


router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);


async function getAll(ctx, next){
	// Return all users from DB
	
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

async function getById(ctx, next){
	let id = ctx.params.id;
	
	// Retrieve all users from db using model
	let user = await model.getByID(id);

	// if result is not empty
	if (user.length) {
		// Return result as response body
		ctx.body = user;
	}else{
		// Otherwise send not found error response 
		ctx.status = 404;
	}

}

async function newUser(ctx, next){

	// Get body of request
	const body = ctx.request.body;

	// TODO: Validate input

	// Add user to database
	const result = await model.newUser(body);

	// If result is success
	if (result) {
		// Get new user id
		const id = result.insertID;
		// Set response status to Created success
		ctx.status = 201;
		// Set response body to ID of new user
		ctx.body = {ID: id};
	} else {
		// Otherwise if failed, send internal server error and log to console
		ctx.status = 500;
		console.error('Failed to create User with parameters:');
		console.error(`${body}`);
	}


}



module.exports = router;
