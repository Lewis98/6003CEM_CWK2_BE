const pkg = require('jsonschema');

const schema = require('../schemas/EditMe.schema.js');

const v = new pkg.Validator();

exports.validate = async (ctx, next) => {

	const params = {
		throwError: true,
		allowUnknownAttributes: false
	};


	const body = ctx.request.body;

	try {
		v.validate(body, schema, params);
		await next();
	} catch (e) {
		// Otherwise if exception raised and is a validation error
		if (e instanceof pkg.ValidationError) {
			// Send error message to user
			ctx.boddy = e;
			// And set status to bad request
			ctx.status = 400;
		} else {
			// Otherwise throw unknown error
			throw e;
		}
	}

}
