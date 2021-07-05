const Koa = require('koa');
const app = new Koa();

// Cross Origin Resource Sharing
const cors = require('@koa/cors');
app.use(cors());


// Debug routes for testing and validation
const debug = require('./routes/debug');
app.use(debug.routes());


// Routes for license application manipulation
const apps = require('./routes/apps.js');
app.use(apps.routes());

// Routes for user manipulation
const users = require('./routes/users.js');
app.use(users.routes());

// - - - UNUSED - - - \\
const staff = require('./routes/employees.js');
app.use(staff.routes());



module.exports = app;
