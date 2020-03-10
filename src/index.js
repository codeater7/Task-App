const express = require('express');
require('./db/mongoose'); // it makes that is run to database
const UserRouter = require('./routers/user');
const taskRouter = require('./routers/task');


const app = express()
const port = process.env.PORT



// app.use(( req, res, next)=>{
//     //GET /users
//     res.status(503).send('Site is currently down, check back soon')
// })

// this days, we dont need to downlown bodyParser separately, express gives like below
app.use(express.json());  // it is going to parse incoming json to object
app.use(UserRouter)
app.use(taskRouter)


app.listen(port, () => {
	console.log('server is listening in ' + port);
});




// to use the middleware  
// app.use(( req, res, next)=>{
//     //GET /users
//     console.log(req.method, req.path)

//     if (req.method === 'GET'){
//         res.send('GET request are disabled ')
//     }else{
//         next()
//     }
   

// })





// const Tasks = require('./models/task')
// const User = require('./models/user')

// const main = async ()=>{
//     // const task = await Tasks.findById('35t4u99u29yr92yt92t92t')
//     // //find the user who is accociated with this task  and taks.owner will be the profile
//     // //as opposed to only id
//     // await task.populate('owner').execPopulate()
//     // console.log(task)
//     // console.log(task.owner)

//     const user = await User.findById('5c9t492u02tu02u02u02')
//     await  user.populate('tasks').execPopulate()
//     console.log(user.task)

// }

// main()

















// {name: "Hal", toJSON: [function]}
//{"name": "Hal"}

// const jwt= require('jsonwebtoken')

// const myFunction = async ()=>{
//     const token = jwt.sign({_id: 'abc123'}, "Hi", {expiresIn:'7 days'})
//     console.log('token is =>',token)
//     //it will be from the becrypt

//     const data= jwt.verify(token, "Hi")
    
//     console.log(data) // _id: 'abc123', iat: 1583704580 }
    
 
// }
// myFunction()


//with encryption we can get the original value back
//hashing are not like that-- it is one way, no way to get that


// const bcrypt= require('bcryptjs')

// const myFunction = async ()=>{
//     const password = 'Red12345!'
//     //it will be from the becrypt
//     const hashedPassword = await bcrypt.hash(password, 8)


//     const isMatch= await bcrypt.compare(password, hashedPassword)
    

// }
// myFunction()



// without middleware : new request => run route handler

// with middleware : new request => do something => run route handler





