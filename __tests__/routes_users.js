const request = require('supertest');
const app = require('../app');

jest.useFakeTimers()

describe('Create new user', () => {
	it('Should create a new user entry', async () => {
		const res = await request(app.callback())
		.post('/api/v1/users/')
		.send({
			username:'UserXZDFRWSDHRQDSBDCNGR',
			password:'test',
			email:'test.user@testMail.com'
		})
		
		done();

		expect(res.statusCode).toEqual(201)
		expect(res.body).toHaveProperty('created',true)
	})
})
