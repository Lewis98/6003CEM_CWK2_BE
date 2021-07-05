const request = require('supertest');
const app = require('../app');

jest.useFakeTimers()


describe('Retrieve all users', () => {
	it('Should return a list of records containing at least essential fields', async() => {
		const res = await request(app.callback())
		.get('/')
		.auth('admin', 'admin')
		
		expect(res.statusCode).toEqual(200);
	})
})



describe('Create new user', () => {
	it('Should create a new user entry', async () => {
		const res = await request(app.callback())
		.post('/api/v1/users/')
		.send({
			username:'UserXZDFRWSDHRQDSBDCNGR',
			password:'test',
			email:'test.user@testMail.com'
		})
		


		expect(res.statusCode).toEqual(201)
	})
})

