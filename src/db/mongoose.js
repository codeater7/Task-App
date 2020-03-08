const mongoose = require('mongoose')
// task-manager-api is the database name
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', 
{ 
    useNewUrlParser:true,
    useCreateIndex:true, //  indexes are created 
    useFindAndModify:false  // DeprecationWarning: collection.findAndModify is deprecated, false vanera override garako
})



// why no export??
// because we're running the code for the its side effects
// MIngooses uses singlton pattern so all teh files that require Mongoose share the same object
// which is how other files that use Mongoose can 'Magically know" about the database connection.






























// const User = mongoose.model ('User', {
//     name: {type : String}, 
//     age: { type: Number}
// })

// const me = new User( { 
//     name:'   Sujan',
//     age:23
   
// })
// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error', error)

//     })

// mongoose.model(name of model, what fields we want to have)


