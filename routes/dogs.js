const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/dogs');

const authenticate = require('../strategies/basic')

const router = Router({prefix: '/api/v1/dogs'});


router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);

router.post('/', bodyParser(), createDog);

router.put('/:id([0-9]{1,})', updateDog);

router.del('/:id([0-9]{1,})', removeDog);


async function getAll(ctx, next){
	//Return all dogs from DB

	// Get all dog records from database using model
	let dogs = await model.getAll();

	// If response is not empty
	if (dogs.length) {
		// Send result in response body
		ctx.body = dogs;
	}else{
		// Else send internal server error and log to console
		ctx.status = 500;
		console.error("Failed to retrieve all dogs from database - No dogs found")
	}
}

async function getById(ctx, next){
	let id = ctx.params.id;

	// Get dog records from database with specified ID
	let dog = await model.getByID(id);	

	// If response is not empty
	if (dog.length) {
		// Send result in response body
		ctx.body = dog;
	}else{
		// Else error
		ctx.status = 404;
	}
}

async function createDog(ctx, next) {
	
	// TODO: input validation
	
	// Parse body of request and retrieve data
	const body = ctx.request.body;

	// Add to database
	const result = await model.newDog(body);
	
	//Return new dog and 201 status code
	// If result is success
	if (result) {
		// Get new dog id
		const id = result.insertID;
		// Set response status to Created success
		ctx.status = 201;
		// Set response body to ID of new dog
		ctx.body = {ID: id};
	} else {
		// Otherwise if failed, send internal server error and log to console
		ctx.status = 500;
		console.error('Failed to create dog with parameters:');
		console.error(`${body}`);
	}
	
}

async function updateDog(ctx, next){
	
	// TODO: Input validation	
	
	// Parse body of request and retrieve data
	const id = ctx.params.body;
	const body = ctx.request.body;

	// Get record to update
	let record = await model.getByID(id);

	// If record doesn't exist
	if (!record.length){
		// Set status to resource not found
		ctx.status = 404;
		// Set response body to display null ID
		ctx.body = {ID: null};
		// Cancel operation
		return;
	};

	// Overwrite existing data with request body data
	// or retain data from original record where request data is absent
	Object.assign(record, body);

	// Overwrite database record with edited record using model
	const result = await model.updateDog(record);

	// If response from database indicated change
	if (result.affectedRows) {
		// Set status code to generic success
		ctx.status = 200;
		// Return ID in response body
		ctx.body = {ID: id};
	}

}

async function removeDog(ctx, next){
	
	// (requires authentication)
	
	const id = ctx.params.id;

	// Get record to update
	let record = await model.removeDog(id);

	// If record deleted
	if (record.affectedRows){
		// Provide generic success status code
		ctx.status = 200
		// and send id in response body
		ctx.body = {ID: id}
	}else{
		// Else if operation failed
		// Set status to resource not found
		ctx.status = 404;
		// Set response body to display null ID
		ctx.body = {ID: null};
		// Cancel operation
		return;
	};
	

	// Remove from database
	// Return confirmation
}


module.exports = router;
