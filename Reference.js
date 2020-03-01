// CRUD 
// methods connect, db,collection
// const mongodb= require('mongodb')
// const {MongoClient,ObjectID}= require('mongodb')



// const id= new ObjectID() // generate own id, 



// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName= 'task-manager' // any name

// ////our url to be parsed correctly useNewURLParser
// MongoClient.connect(connectionURL,{ useNewUrlParser: true }, (error,client)=>{
//     if (error){
//        return console.log('unable to connect to database')
//     }
//     const db= client.db(databaseName) //reference to the database

//     // d
    
    // insertMany....................

    // db.collection('users').insertMany([{name:'Jen', age:28}, {name:'Samy', age:29}], (error, result)=>{
    //     if(error){
    //         return console.log('unable to insert documents')
    //     }
    //     console.log(result.ops)

    // })
    // db.collection('tasks').insertMany([{description:'Hellow how are you', completed:false}, {description:'I want to learn here', completed:true},{description:"today is sunday", completed:false} ], (error, result)=>{
    //     if(error){
    //         return console.log('unable to insert documents')
    //     }
    //     console.log(result.ops)

    // })

    // Find.... find one......................
    //  we are searching the following way, normal string lee garera hudaina, it needs to be wrapped
//     db.collection('users').findOne({_id:new ObjectID('5e5b94661da8483ddc5be996') }, (error, user)=>{
//         if (error){
//             return console.log('Unable to fetch')
//         }

//         console.log(user)
//     })
    

// //find had the cursor( toArray)(count garee ni hunxa)
//     db.collection('users').find({age:27}).toArray((error,users)=>{
//     console.log(users)


//     const updatePromise= db.collection('users').updateOne({_id: new ObjectID("5e5b8ee9fb0c753d958f86e9")}),
//     {$set:{
//         name:'Mikee'
//     }
// })
//     updatePromise.then((result)=>{
//         console.log(result)

//     }).catch((error)=>{
//         console.log(error)
//     })
//     })

// db.collection('users').deleteMany({
//     age:28
    
// }).then((result)=>{
//     console.log(result)

// }).catch((error)=>{
//     console.log(error)
// })

// })







//console.log("this is mongoClient")
// function MongoClient(url, options) {
//     if (!(this instanceof MongoClient)) return new MongoClient(url, options);
//     // Set up event emitter
//     EventEmitter.call(this);
  
//     // The internal state
//     this.s = {
//       url: url,
//       options: options || {},
//       promiseLibrary: null,
//       dbCache: {},
//       sessions: []
//     };
  
//     // Get the promiseLibrary
//     const promiseLibrary = this.s.options.promiseLibrary || Promise;
  
//     // Add the promise to the internal state
//     this.s.promiseLibrary = promiseLibrary;
//   }