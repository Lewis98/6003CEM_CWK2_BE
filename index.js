const Koa = require('koa');
const app = new Koa();


// Routes for dog retrieval and modification
const dogs = require('./routes/dogs.js');
app.use(dogs.routes());



app.listen(3000);
