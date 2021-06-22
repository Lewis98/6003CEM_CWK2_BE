module.exports = {
	"$schema": "https://json-schema.org/draft-04/schema#",

	"title": "Application",
	"description": "A Trading license application",

	"type": "object",
	"properties": {
		
		"co_name": {
			"type": "string",
			"maxLength": 255,

			"description": "Company Name"
		},
		
		"co_est": {
			"type": "date",

			"description": "Company Established date"
		},
		
		"applicant_id": {
			"type": "integer",
			"minimum": 0,

			"description": "ID of applicant account"
		},

		"co_addr_l1": {
			"type": "string",
			"maxLength": 255,

			"description": "Company address - Line 1"
		},

		"co_addr_l2": {
			"type": "string",
			"maxLength": 255,

			"description": "Company address - Line 2"
		},

		"co_addr_pc": {
			"type": "string",
			"maxLength": 10,

			"description": "Company address - Post Code"
		},
	},

	"required": ["co_name", "applicant_id", "co_addr_l1", "co_addr_pc"]
}
