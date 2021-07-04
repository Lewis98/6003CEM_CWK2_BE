/**
 * Authentication module for user
 *
 * @module controllers/auth
 * @author Lewis Stokes
 *
 * @see strategies/basic for Basic access authentication definitions
 */

const passport = require('koa-passport');
const basicAuth = require('../strategies/basic');

passport.use(basicAuth);

/** Packaged koa-passport authenticate method using strategies/basic module */
module.exports = passport.authenticate(['basic'], {session:false});
