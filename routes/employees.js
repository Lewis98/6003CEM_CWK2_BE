const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/employees');

const bcrypt = require('bcrypt');

const router = Router({prefix: '/api/v1/staff'});


router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);

router.get('/test', testcmd);

router.post('/', bodyParser(), newUser);


async function getAll(ctx, next){
	//Return all staff accounts from DB
	
	let staff = await model.getAll();
	if (staff.length) {
		ctx.body = staff;
	}else{
		ctx.status = 404;
	}
}

async function getById(ctx, next){
	let id = ctx.params.id;

}

async function testcmd(ctx, next){
	ctx.body = await model.getByUsername('admin');
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
				console.log (`'$(body.username)' successfully created in database with values:`)
				console.log (body);

				// Return success and new employee ID
				const id = result.insertID;
				ctx.status = 201;
				ctx.body = {ID: id};
			} else {
				// Else log error and display body to console
				console.error(`Failed to add '$(body.username)' to database with data: `)
				console.error(body);

				// And return internal server error to user
				ctx.status = 500;
			}
		} else {

			// If hash fails log to console and return internal server error
			console.error(`Error hashing: '$(e)'`);
			ctx.status = 500;
		}
	});
}



// Deprecated
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
