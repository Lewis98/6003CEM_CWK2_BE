const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/users');

const authenticate = require('../controllers/auth');
const bcrypt = require('bcrypt');

const {validate} = require('../controllers/validation');


const router = Router({prefix: '/api/v1/users'});


router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);

router.post('/', validate("user"), newUser);


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

				// Return success and new employee ID
				const id = result.insertID;
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



module.exports = router;
