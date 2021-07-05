const request = require('supertest');
const app = require('../app');

//jest.useFakeTimers()


const authKey = "YWRtaW46YWRtaW4=";
const authKeyWrong = "YXNmZGFnc3JmaGhk";

describe('Queries debug routes and validates response', () => {
	it('Should get valid response from default debug route', async () => {
		const res = (await request(app.callback())
		.get('/api/v1/'))
		
		expect(res.statusCode).toEqual(200)
		
	});

	it('Should get valid response from privateAPI debug route with proper authorization', async () => {
		const res = await request(app.callback())
		.get('/api/v1/private')
		.set('Authorization', 'Basic ' + authKey)

		expect(res.statusCode).toEqual(200)
	});

	it('Should fail auth with incorrect credentials', async () => {
		const res = await request(app.callback())
		.get('/api/v1/private')
		.set('Authorization', 'Basic ' + authKeyWrong)

		expect(res.statusCode).toEqual(400)
	})
})

