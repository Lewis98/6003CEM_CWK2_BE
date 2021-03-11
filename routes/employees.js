const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/employees');

const authenticate = require('../controllers/auth');
const {validate} = require('../controllers/validation');

const bcrypt = require('bcrypt');

const router = Router({prefix: '/api/v1/staff'});


router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);


router.post('/', authenticate, bodyParser(), validate("employee"), newUser);


async function getAll(ctx, next){
	//Return all staff accounts from DB
	
	// Retrieve all records from employees table
	let staff = await model.getAll();

	// If result exists
	if (staff.length) {
		// Return to user as response body
		ctx.body = staff;
	}else{
		// Throw internal server error and log to console
		ctx.status = 500;
		console.error('Failed to retrieve employee records - No records found');
	}
}

async function getById(ctx, next){
	let id = ctx.params.id;
	
	// Retrieve record with specified ID
	let result = await model.getByID(id);
	
	// If result exists
	if (result.length) {
		// Return employee record in response body
		ctx.body = result;
	}else{
		// Else error with result not found
		ctx.status = 404;
	}

}

async function newUser(ctx){

	const body = ctx.request.body;
	
	// TODO: data validation

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
				console.error(`Failed to add '${body.username}' to database with data: `)
				console.error(body);

				// And return internal server error to user
				ctx.status = 500;
			}
		} else {

			// If hash fails log to console and return internal server error
			console.error(`Error hashing: '${e}'`);
			ctx.status = 500;
		}
	});
}



// Deprecated function
function generateSalt(len){
	
	// Instantiate result
	let result = "";

	const legalChars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!£$%^&*(){}[]<>#~:'@,.";

	// for length specified
	for (i = 0; i < len; i++){
		// Retrieve random character from legal characters
		val = legalChars.charAt(Math.floor(Math.random() * legalChars.length));
		// Append character to string
		result += val;
	}

	// return random string
	return result;

}

module.exports = router;
