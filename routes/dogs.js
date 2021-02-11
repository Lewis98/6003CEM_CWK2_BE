const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = Router({prefix: '/api/v1/dogs'});


router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);

router.post('/', bodyParser(), createDog);

router.put('/:id([0-9]{1,})', updateDog);

router.del('/:id([0-9]{1,})', removeDog);


function getAll(ctx, next){
	//Return all dogs from DB
}

function getById(ctx, next){
	let id = ctx.params.id;

	//Return dog with passed id
}

function createDog(ctx, next){

	// (requires previous validation)

	//Parse body of request and retrieve data
	//
	//Create new dog object
	//
	//Add to database
	//
	//Return new dog and 201 status code
}

function updateDog(ctx, next){
	
	// (requires previous validation)
	
	//Parse body of request and retrieve data
	//
	//Update relevant values of record within DB
	//
	//Return new data from dog object
}

function removeDog(ctx, next){
	
	// (requires authentication)
	
	// Check dog exists
	// Remove from database
	// Return confirmation
}

module.exports = router;