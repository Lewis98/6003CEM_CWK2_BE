module.exports = {
	"$schema": "https://json-schema.org/draft-04/schema#",
	"$id": ?,

	"title": "Dog",
	"description": "A dog entity",

	"type": "object",
	"properties": {
		"name": {
			"type": "string",
			"maxLength": 50,

			"description": "Name of dog"
		},

		"age": {
			"type": "integer",

			"description": "Age of dog"
		},

		"description": {
			"type": "string",

			"description": "Description of dog displayed to users"
		},

		"siteID": {
			"type": "integer",

			"description": "ID of site where dog is held"
		},

		"breed": {
			"type": "string",
			"maxLength": 50,

			"description": "Breed of dog"
		},

		"image": {
			"type": "string",
			"maxLength": 50,

			"description": "URI for image of dog"
		},

		"available": {
			"type": "boolean",

			"description": "Whether dog is available for adoption"
		},

		"notes": {
			"type": "string",

			"description": "Notes for dog only visible to employees"
		},
	},

	"required": ["name"]
}
