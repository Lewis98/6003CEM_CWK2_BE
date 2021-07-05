const request = require('supertest');
const app = require('../app');

jest.useFakeTimers()

describe('Queries debug routes and validates response', () => {
	it('Should get valid response from default debug route', async () => {
		const res = (await request(app.callback())
		.get('/api/v1/'))
		
		expect(res.statusCode).toEqual(200)
		
	})
})
