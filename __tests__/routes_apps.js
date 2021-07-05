const request = require('supertest');
const app = require('../app');

//jest.useFakeTimers()


const authKey = "YWRtaW46YWRtaW4=";
const authKeyWrong = "YXNmZGFnc3JmaGhk";

describe('Queries license application endpoints', () => {
	it('Should get valid response from getAll route', async () => {
		const res = await request(app.callback())
		.get('/api/v1/applications/')
		.set('Authorization', 'Basic ' + authKey)
		
		expect(res.statusCode).toEqual(200)
		expect(res.body[0]).toHaveProperty('co_name') // check to make sure correct object
		expect(res.body[0]).toHaveProperty('status')
		
	});

	it('Should fail to retrieve records with incorrect auth', async () => {
		const res = await request(app.callback())
		.get('/api/v1/applications/')
		.set('Authorization', 'Basic ' + authKeyWrong)
		
		expect(res.statusCode).toEqual(400)		
	});


	it('Should get single record from GetById', async () => {
		const res = await request(app.callback())
		.get('/api/v1/applications/1')
		.set('Authorization', 'Basic ' + authKey)

		expect(res.statusCode).toEqual(200)
		expect(res.body[0]).toHaveProperty('status')
	});

	it('Should successfully create an application', async () => {
		const res = await request(app.callback())
		.post('/api/v1/private')
		.send({
			"co_name": "Test Company",
			"applicant_id": 1,
			"co_addr_l1": "Test Address",
			"co_addr_pc": "TE1 2ST"
		})
		.set('Authorization', 'Basic ' + authKey)

		expect(res.statusCode).toEqual(404);
	})
})

