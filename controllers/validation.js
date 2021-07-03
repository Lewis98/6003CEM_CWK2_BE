const pkg = require('jsonschema');


// Define potential schemas to validate against
// This allows a single function to perform validation for all schemas
const schemas = {
	application: require('../schemas/app.schema.js'),
	user: require('../schemas/user.schema.js'),
	role: require('../schemas/role.schema.js')
};


const v = new pkg.Validator();


// Validation function
exports.validate = (schema_str) => async (ctx, next) => {

	/*
	 *	Validation function
	 *	
	 *	Input:
	 *	  - schema_str (str) - Key of schema to use defined above
	 * */

	// Paramters defined for use in Validator validate method
	const params = {
		throwError: true,
		allowUnknownAttributes: false
	};

	// Select schema for use from dictionary
	schema = schemas[schema_str];

	// If no schema selected
	if (schema === undefined) {
		// Throw error to console and inform of options
		console.error(`'Validation': Invalid schema '${schema_str}' passed, valid options are: ${Object.keys(schemas)}`);
		ctx.status = 500; // Send internal server error to user
		return; // Terminate function
	}

	// Retrieve body of request
	const body = ctx.request.body;


	try {	
		// Validate body against schema using Validator's validate method
		v.validate(body, schema, params);
		// Call next middleware
		await next();
	} catch (e) {
		// Otherwise if exception raised and is a validation error
		if (e instanceof pkg.ValidationError) {
			
			console.log("Failed validation for request:");
			console.log(body);
			
			// Send error message to user
			ctx.body = e;
			// And set status to bad request
			ctx.status = 400;
		} else {
			// Otherwise throw unknown error and provide user with internal server error
			ctx.status = 500;
			throw e;
		}
	}

}
