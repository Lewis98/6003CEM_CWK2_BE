/**
 * Module for debug routes used to test connectivity
 *
 * @module routes/debug
 * @author Lewis Stokes
 */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const authenticate = require('../controllers/auth');

const router = Router({prefix: '/api/v1'})

router.get('/', helloWorld)
router.get('/private', authenticate, privateAPI);


/**
 * helloWorld
 * @description Basic endpoint that returns Hello World when accessed
 * @param {object} ctx - Context object of HTTP Request
 */
function helloWorld(ctx) {

	ctx.status = 200;
	ctx.body = {message: "Hello World!"};

}

/**
 * privateAPI
 * @description Basic endpoint for testing of user authentication
 * @param {object} ctx - Context object of HTTP Request
 */
function privateAPI(ctx) {
	const user = ctx.state.user;

	ctx.body = {message: `Private route request made by '${user.username}'`}
}

module.exports = router;
