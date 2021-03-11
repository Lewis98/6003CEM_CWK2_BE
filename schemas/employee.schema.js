module.exports = {
	"$schema": "https://json-schema.org/draft-04/schema#",
//	"$id": "?",

	"title": "Employee",
	"description": "Employee user account",

	"type": "object",
	"properties": {
		"firstName": {
			"type": "string",
			"maxLength": 50,

			"description": "Employee first name"
		},
		
		"lastName": {
			"type": "string",
			"maxLength": 50,

			"description": "Employee last name"
		},

		"password": {
			"type": "string",
			"maxLength": 255,

			"description": "Password to autenticate employee - Encrypted"
		},

		"siteID": {
			"type": "integer",

			"description": "ID of site where employee is based"
		},

		"email": {
			"type": "string",
			"maxLength": 50,

			"description": "Email address of employee"
		},

		"phone": {
			"type": "string",
			"maxLength": 20,

			"description": "Phone number of employee"
		},

		"username": {
			"type": "string",
			"maxLength": 30,

			"description": "Username used to log in - Will be generated if not specified"
		}
	},

	"required": ["firstName", "password", "email"]
}
