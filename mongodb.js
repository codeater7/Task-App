// methods connect, db,collection
const mongodb = require('mongodb');
const { MongoClient, ObjectID } = require('mongodb'); 

// const id = new ObjectID(); // generate own id,

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager'; // any name

////our url to be parsed correctly useNewURLParser
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
	if (error) {
		return console.log('unable to connect to database');
    }
    console.log("connected correctly")
    const db = client.db(databaseName); //reference to the database
    
    //  db.collection('users')
	// 	.insertOne({
    //         name:'Andrew',
	// 		age: 28,
	// 	})
	// 	.then(result => {
	// 		console.log(result);
	// 	})
	// 	.catch(error => {
	// 		console.log(error);
	// 	});

	
});
//we need to connect
// we need the url 

/// db.collection('users') 
	// 	.deleteMany({
	// 		age: 28,
	// 	})
	// 	.then(result => {
	// 		console.log(result);
	// 	})
	// 	.catch(error => {
	// 		console.log(error);
	// 	});