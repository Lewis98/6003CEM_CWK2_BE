module.exports = {
	"$schema": "https://json-schema.org/draft-04/schema#",
//	"$id": "?",

	"title": "User",
	"description": "A user account entity",

	"type": "object",
	"properties": {
		"username": {
			"type": "string",
			"maxLength": 50,

			"description": "Human friendly user identification for login"
		},

		"password": {
			"type": "string",

			"description": "Password to authenticate login - Encrypted"
		},

		"email": {
			"type": "string",

			"description": "User's email account"
		},

		"firstName": {
			"type": "string",
			"maxLength": 50,

			"description": "first name"
		},
		
		"lastName": {
			"type": "string",
			"maxLength": 50,

			"description": "last name"
		},

		"siteID": {
			"type": "integer",

			"description": "ID of site where employee is based"
		},


		"profileImg": {
			"type": "string",
			"maxLength": 50,

			"description": "URI for user's profile avatar"
		}
	},

	"required": ["username", "password", "email"]
}
