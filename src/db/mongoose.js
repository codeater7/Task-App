const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', 
{ 
    useNewUrlParser:true,
    // indexes are created 
    useCreateIndex:true,
    
    // DeprecationWarning: collection.findAndModify is deprecated.
    //  Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
    useFindAndModify:false
})
// model(name of model, what fields we want)



// const me = new User( { 
//     name:'   Sujan',
//     age:23,
//     email: 'pokhrel123@gmail.com',
//     password:'    34frd'
// })
// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error', error)
//     })


