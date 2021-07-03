module.exports = {
	"$schema": "https://json-schema.org/draft-04/schema#",
//	"$id": "?",

	"title": "Role",
	"description": "A role type that can be assigned to users",

	"type": "object",
	"properties": {
		"role": {
			"type": "string",
			"maxLength": 50,

			"description": "Name of role"
		},

		"isEmployee": {
			"type": "boolean",

			"description": "Whether role is an employee role?"
		},
	},

	"required": ["name", "isEmployee"]
}
