require('../src/db/mongoose')
const Task= require('../src/models/task')

//5e5c227bebd0c644dfc75350

// findByIDandUpdate

// first we just want to update and later count the number of task where completed is false

Task.findByIdAndUpdate('5e5c227bebd0c644dfc75350', {
    description:'this is just that '
}).then((task)=>{    //chaining
    console.log(task)
    return Task.countDocuments({completed:true})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})