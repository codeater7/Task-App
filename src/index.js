const express = require('express');
require('./db/mongoose'); // it makes that is run to database
const UserRouter = require('./routers/user');
const taskRouter = require('./routers/task');


const app = express()
const port = process.env.PORT ||3000
// this days, we dont need to downlown bodyParser separately, express gives like below
app.use(express.json());  // it is going to parse incoming json to object
app.use(UserRouter)
app.use(taskRouter)


app.listen(port, () => {
	console.log('server is listening in ' + port);
});

const bcrypt= require('bcryptjs')

const myFunction = async ()=>{
    const password = 'Red12345!'
    //it will be from the becrypt
    const hashedPassword = await bcrypt.hash(password, 8)


    const isMatch= await bcrypt.compare(password, hashedPassword)
    

}
myFunction()


//with encryption we can get the original value back
//hashing are not like that-- it is one way, no way to get that










