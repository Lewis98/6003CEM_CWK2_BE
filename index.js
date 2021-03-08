const Koa = require('koa');
const app = new Koa();


const debug = require('./routes/debug');
app.use(debug.routes());


// Routes for dog retrieval and modification
const dogs = require('./routes/dogs.js');
app.use(dogs.routes());

const users = require('./routes/users.js');
app.use(users.routes());

const staff = require('./routes/employees.js');
app.use(staff.routes());



app.listen(3000);
