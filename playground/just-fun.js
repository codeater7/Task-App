
// app.get('/tasks', (req, res) => {

// 	Task.find({}).then((tasks)=>{

//         res.send(tasks)

//     }).catch((error)=>{
//         res.status(500).send(error)

//     })
// })

// app.post('/tasks', (req, res) => {
//     // property we are trying to set up is in req.body
// 	const task = new Task(req.body);
// 	task.save()
// 		.then(() => {
// 			res.status(201).send(task);
// 		})
// 		.catch(error => {
//             res.status(400).send(error)
//         });
// });


// app.get('/tasks/:id', (req, res) => {
// 	//param ko bata taha huna parnee ho ni ta
// 	const _id = req.params.id;
// 	Task.findById(_id)
// 		.then(task => {
// 			if (!task) {
// 				return res.status(404).send();
// 			}
// 			res.send(task);
// 		})
// 		.catch(error => {
// 			res.status(500).send();
// 		});
// });



// app.get('/tasks/:id', async (req, res) => {
// 	const _id = req.params.id;
// 	try {
//         const task = await Task.findById(_id);
//         if (!task) {
// 			return res.status(404).send();
// 		}
// 		res.send(task);
// 	} catch (error) {
// 		res.status(500).send();
// 	}
// });

// app.patch('/tasks/:id', async(req,res)=>{
//     //     sujan {height: 45, weight: 35}
//     // Object.keys(sujan)
//     // (2) ["height", "weight"]
    
//         const updates = Object.keys(req.body) // will bring only keys into array
//         const allowedUpdates= ['description', 'completed']
//         const isValidOperation= updates.every((update)=>{
//             return allowedUpdates.includes(update)
    
//         }) 
//         if(!isValidOperation){
//             return res.send(400).send({error:'Invalid updates!!'})
//         }
    
//         try{
//             const task = await Task.findByIdAndUpdate(req.params.id,  req.body, {new:true, runValidators:true})
//             if (!task){
//                 return res.status(404).send
//             }
//             res.send(task)
//         } catch(e){
//             res.send(400).send(e)
    
//         }
//     })
    

//  app.delete('/tasks/:id', async(req, res) =>{
//         try{
//             const task= await Task.findByIdAndDelete(req.params.id)
//             if (!task){
//                 return res.status(404).send()
//             }
//             res.send(task)
    
//         }catch (e){
//             res.send(500).send()
    
//         }
//     })



// app.post('/tasks', async (req, res) => {
// 	// property we are trying to set up is in req.body
//      const task = new Task(req.body);
    
// 	try {
// 		const tasks = await task.save();
// 		res.status(201).send(tasks);
// 	} catch (error) {
// 		res.status(400).send(error);
// 	}
// });



// app.get('/tasks', async (req, res) => {
// 	try {
// 		const tasks = await Task.find({});
// 		res.send(tasks);
// 	} catch (error) {
// 		res.status(500).send(error);
// 	}
// });
