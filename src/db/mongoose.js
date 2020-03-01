const mongoose = require('mongoose')
const validator= require('validator')

mongoose.connect('mongoose://127.0.0.1:27017/task-manager-api', 
{ 
    useNewUrlParser:true,
    // indexes are created 
    useCreateIndex:true
})
// model(name of model, what fields we want)
const User= mongoose.model('User', {
    name:{
        type:String, required:true, trim:true},
    age:{
        type:Number, default:0,
        validate(value){
            if (value<0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    email:{ type:String, required:true, trim:true, lowercase:true,
        validate (value) {
            // running validator 
            if(!validator.isEmail(value)){
                throw new Error ('Email is invalid')
            }
        }},
    password:{ type:String, required:true, minlength:7, trim:true,
            validate (value) {
                // running validator 
                if(value.toLowerCase().includes('password')){
                    throw new Error ('password cannot contain "password')
                }
            }}
})


const me = new User( { 
    name:'   Sujan',
    age:23,
    email: 'pokhrel123@gmail.com',
    password:'    34frd'
})

me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log('Error', error)
    })


const Task = mongoose.model('Task', {
    description: { type: String},
    completed: {type:Boolean}
    
    
})
const newTask = new Task({
    description:'this is it ',
    completed:true

})
newTask.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log('Error', error)
})