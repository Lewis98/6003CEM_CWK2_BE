/**
 * Routes module for license applications
 *
 * @module routes/apps
 * @author Lewis Stokes
 */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/applications');

const authenticate = require('../controllers/auth');
const {validate} = require('../controllers/validation');

const can = require('../permissions/apps');

const prefix = '/api/v1/'
const router = Router({prefix: prefix + 'applications'});


router.get('/', authenticate, getAll);
router.get('/:id([0-9]{1,})', authenticate, getById);
router.get('/user/:id([0-9]{1,})', authenticate, getByUserId);

router.post('/', authenticate, validate("application"), bodyParser(), createApp);
router.post('/image', authenticate, validate("image"), bodyParser(), addImage);

router.put('/:id([0-9]{1,})', authenticate, bodyParser(), updateApp);

router.del('/:id([0-9]{1,})', authenticate, deleteApp);


/**
 * getAll
 * @description Returns all applications from DB.
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback
 */
async function getAll(ctx, next){
	//Return all applications from database
	
	const perm = can.readAll(ctx.state.user);

	if (!perm.granted){
		ctx.status = 403;
		return;
	}
	

	let applications = await model.getAll();

	// If response is not empty
	if (applications.length) {
		// Send result in response body
		ctx.body = applications;
	}else{
		// Else send internal server error and log to console
		ctx.status = 500;
		console.error("Failed to retrieve all records from database - None found")
	}
}

/**
 * getById
 * @decription Returns license application by specified ID in URI parameters
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback
 */
async function getById(ctx, next){

	let id = ctx.params.id;

	// Get application record from database with specified ID
	let application = await model.getById(id);

	// If response is not empty
	if (application.length) {

		const perm = can.read(ctx.state.user, application[0]);

		if (!perm.granted){
			ctx.status = 403;
			return;
		}

		let images = await model.getImages(application[0].id);

		application[0].images = images;

		const links = {
			user: `https://${ctx.host}${prefix}users/${application[0].applicant_id}`
		}

		application[0].links = links;

		// Send result in response body
		ctx.body = application;

	}else{
		// Else error
		ctx.status = 404;
	}
}

/**
 * getByUserId
 * @description Returns all license applications with applicant ID matching specified URI paramter ID
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback
 */
async function getByUserId(ctx, next) {
	let id = ctx.params.id;

	// Get application record from database with specified ID
	let application = await model.getByUserId(id);	

	// If response is not empty
	if (application.length) {
		
		const perm = can.read(ctx.state.user, application[0]);

		if (!perm.granted){
			ctx.status = 403;
			return;
		}
		
		
		// Send result in response body
		ctx.body = application;

	}else{
		// Else error
		ctx.status = 404;
	}

}

/**
 * createApp
 * @description Creates a new license application with data from request body
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback
 */
async function createApp(ctx, next) {
	
	// Parse body of request and retrieve data
	const body = ctx.request.body;

	console.log("Request to create licesnce application with params:");
	console.log(body);
	
	// If date is present
	if (body.co_est){
		// Truncate from datetime to date
		body.co_est = body.co_est.substring(0, 10);
	}

	// Add to database
	const result = await model.newApp(body);
	
	//Return new application and 201 status code
	// If result is success
	if (result) {
		// Get new application id
		const id = result.insertID;
		// Set response status to Created success
		ctx.status = 201;
		// Set response body to ID of new application
		ctx.body = {ID: id};
	} else {
		// Otherwise if failed, send internal server error and log to console
		ctx.status = 500;
		console.error('Failed to create application with parameters:');
		console.error(`${body}`);
	}
	
}

/**
 * addImage
 * @description Adds image to images database, allows users to attach images to license application
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback
 */
async function addImage(ctx, next){
	
	const body = ctx.request.body;

	console.log(body);
	
	// Get record to update
	let record = await model.getById(body.app_id);

	// If record doesn't exist
	if (!record.length){
		// Set status to resource not found
		ctx.status = 404;
		// Set response body to display null ID
		ctx.body = {ID: null};
		// Cancel operation
		return;
	};

	const perm = can.update(ctx.state.user, record[0]);

	if (!perm.granted){
		ctx.status = 403;
		return;
	}

	
	try{
		const result = await model.newImage(body);
	
		ctx.status = 201;
	}catch (error){
		ctx.status = 500;
	}

}

/**
 * updateApp
 * @description Updates license application with data from request body
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback
 */
async function updateApp(ctx, next){	
	
	// Parse body of request and retrieve data
	const id = ctx.params.id;
	const body = ctx.request.body;

	// Get record to update
	let record = await model.getById(id);

	console.log(record)
	// If record doesn't exist
	if (!record.length){
		// Set status to resource not found
		ctx.status = 404;
		// Set response body to display null ID
		ctx.body = {ID: null};
		// Cancel operation
		return;
	};

	const perm = can.update(ctx.state.user, record[0]);

	if (!perm.granted){
		ctx.status = 403;
		return;
	}
	
	record = record[0];

	// Overwrite existing data with request body data
	// or retain data from original record where request data is absent
	Object.assign(record, body);

	// Overwrite database record with edited record using model
	const result = await model.update(record, record.id);

	// If response from database indicated change
	if (result.affectedRows) {
		// Set status code to generic success
		ctx.status = 200;
		// Return ID in response body
		ctx.body = {ID: id};
	}else{
		ctx.status = 500;
	}

}

/**
 * deleteApp
 * @description Deletes license application from database
 * @param {object} ctx - Context object of HTTP Request
 * @param {function} next - Callback
 */
async function deleteApp(ctx, next){
	
	// (requires authentication)
	
	const id = ctx.params.id;
	
	// Get record to delete
	let record = await model.getById(id);

	// If record doesn't exist
	if (!record.length){
		// Set status to resource not found
		ctx.status = 404;
		// Set response body to display null ID
		ctx.body = {ID: null};
		// Cancel operation
		return;
	};

	const perm = can.deleteApplication(ctx.state.user, record[0]);

	if (!perm.granted){
		ctx.status = 403;
		return;
	}


	// Call remove method in model and assign to record result
	record = await model.remove(id);

	console.log(record);

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
	
}

/** Application routes */
module.exports = router;
