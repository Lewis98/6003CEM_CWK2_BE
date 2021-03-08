const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/users');

const router = Router({prefix: '/api/v1/users'});


router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);


async function getAll(ctx, next){
	//Return all users from DB
	
	let dogs = await model.getAll();
	if (dogs.length) {
		ctx.body = dogs;
	}else{
		ctx.status = 404;
	}
}

async function getById(ctx, next){
	let id = ctx.params.id;

}

async function newUser(ctx, next){

	const body = ctx.request.body;
	const result = await model.newUser(body);

	if (result) {
		const id = result.insertID;
		ctx.status = 201;
		ctx.body = {ID: id};
	} else {
		// failed
		ctx.status = 500;
	}


}



module.exports = router;
