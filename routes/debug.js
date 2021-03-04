const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const authenticate = require('../controllers/auth');

const router = Router({prefix: '/api/v1'})

router.get('/private', authenticate, privateAPI);

function privateAPI(ctx) {
	const user = ctx.state.user;

	ctx.body = {message: `Private route request made by '${user.username}'`}
}

module.exports = router;
