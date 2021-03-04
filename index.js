const Koa = require('koa');
const app = new Koa();


const debug = require('./routes/debug');
app.use(debug.routes());


// Routes for dog retrieval and modification
const dogs = require('./routes/dogs.js');
app.use(dogs.routes());



app.listen(3000);
