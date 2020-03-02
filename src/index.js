const express = require('express');
require('./db/mongoose'); // it makes that is run to database

const userRouter = require('./routers/user')
const taskRouter= require('./models/task')

const app = express();
const port = process.env.PORT || 3000;

//data ksari use garnee tetikai pathauda ok thio
// express lai incoming json parse gar vanne, object ma dekhauxa tslee
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)





app.listen(port, () => {
	console.log('server is listening in ' + port);
});
