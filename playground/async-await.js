const doWork = ()=>{

}
//lets call this function and return its printing value to the terminal
//Javascript function?  if explicitly we dont return something from the function, undefined is implicitly defined
console.log(doWork())
// undefined nai ho


const doWork= async()=>{
}
    //mathi async lee matra we get promise and that promise is fulfilled with undefined 
console.log(doWork())
// Promise {undefined}


const doWork=async()=>{
    return 'Sujan'
};  //it does not return Sujan but Promsie with string Sujan

console.log(doWork())
//Promsie {'Sujan'}

// *****************************************************

// if promise aako ho vani then rakham
// doWork fulfill vayeaxi lets get access to the result
doWork().then((result)=>{
    console.log( result)
}).catch((e)=>{
    console.log('e', e)

})

// we get Sujan

// catch ksari garnee ta?? error async bata nai falnee

const doWork =async()=>{
    throw new Error('Something wwnt wrong')
    return
}
doWork().then((result)=>{
    console.log('result', result)
}).catch((e)=>{
    console.log('e', e)
})
// Yesma error object aauxa ... ksari chalna parnee ho tsari nai

//aba promise leram

const add =(a,b)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        }, 2000)
    })
}

const doWork =async()=>{
    // we get an promise because add returns the promise
   const sum=  await add( 1, 99) // wait 2 sec asynchronous is being done
   const sum2 = await add (sum, 50) // wait 2 sec
   const sum3 = await add(sum2,3) // wait 2 sec

   return sum3
    // where do I get access to that data??
}
doWork().then((result)=>{
    console.log('result', result)
}).catch((e)=>{
    console.log('e', e)
})

// standard functiona and es6 method definition syntax on a object
const updateAgeandCount = async( id, age) =>{
 
    const user = await User.findByIdAndUpdate(id, {age:age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeandCount('5cd456fr473u92uhdnkdnia', 2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
const deleteTaskandCount = async(id,completed) =>{
    const deleted= await Task.FindByIdAndDelete(id ) 
    // want to only count the completed
    const count = await USer.countDocuments({completed:false})
    return count

}
deleteAgeandCount('5cd456fr473u92uhdnkdnia', false).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})