const pkg = require('jsonschema');

const schemas = {
	dog: require('../schemas/dog.schema.js'),
	user: require('../schemas/user.schema.js'),
	employee: require('../schemas/employee.schema.js')
};

const v = new pkg.Validator();

exports.validate = (schema_str) => async (ctx, next) => {

	const params = {
		throwError: true,
		allowUnknownAttributes: false
	};

	schema = schemas[schema_str];
	
	if (schema === undefined) {
		console.error(`'Validation': Invalid schema '${schema_str}' passed, valid options are: ${Object.keys(schemas)}`);
		ctx.status = 500;
		return;
	}

	const body = ctx.request.body;


	try {
		v.validate(body, schema, params);
		await next();
	} catch (e) {
		// Otherwise if exception raised and is a validation error
		if (e instanceof pkg.ValidationError) {
			// Send error message to user
			ctx.body = e;
			// And set status to bad request
			ctx.status = 400;
		} else {
			// Otherwise throw unknown error
			ctx.status = 500;
			throw e;
		}
	}

}
