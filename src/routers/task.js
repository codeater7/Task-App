const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth')
const router = new express.Router();


router.post('/tasks', auth, async (req, res) => {
	// property we are trying to set up is in req.body
    //const task = new Task(req.body); // adding the owner property // link the user  and tasks
    const taks = new Task ({
        ...req.body, owner: req.user._id
    })
	try {
		const tasks = await task.save();
		res.status(201).send(tasks);
	} catch (error) {
		res.status(400).send(error);
	}
});

//GET  /tasks?completed=true
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt:desc        (filed we are trying to sort by, 2nd is the order)
// 100-1000 of dataabase 
// limit skip ( pagination)
router.get('/tasks', auth, async (req, res) => {
    //req.query.completed
    const match = { }
    const sort= { }

    if ( req.query.completed){ // yedi match garera search garako vayee hai
        // we are setting to string, address ma string aauxa hai, boolean hoina
        match.completed = req.query.completed === 'true'
}
    if (req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1]==='desc' ? -1 : 1
        //sortBy= desc ( if descending -1 else 1)
    }
	try {
        //const tasks = await Task.find({ owner:res.user._id});
        // either of the above will work
        // mathi ko link ko path ani match garnee, tara we have to make it dynamic
        await req.user.populate({ 
            path:'tasks',
             match ,
             options: {
                    limit:parseInt(request.query.limit),
                    skip:pareseInt(request.query.skip), // Kati ota skip garnee vanera
                    // sort:{
                    //     createdAt: -1 // descending ( latest firt)
                    //     //completed: -1
                    // }
                    sort
             }
            }).excePopulate()
		res.send(req.user.tasks);
	} catch (error) {
		res.status(500).send(error);
	}
});
// lets make only the tasks that are created by the user
router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	try {
        //const task = await Task.findById(_id);
        const task = await Task.findOne({_id, owner:req.user._id})
		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (error) {
		res.status(500).send();
	}
});

router.patch('/tasks/:id', async (req, res) => {
	// sujan {height: 45, weight: 35}
	// Object.keys(sujan)
	// (2) ["height", "weight"]

	const updates = Object.keys(req.body); // will bring only keys into array
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every(update => {
		return allowedUpdates.includes(update);
	});
	if (!isValidOperation) {
		return res.send(400).send({ error: 'Invalid updates!!' });
	}

	try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        // const task = await Task.findById(req.params.id)
        // updates.forEach((update)=>{
        //     task[update] = req.body[update]
        // })

        // await task.save()
        // above will work too
		//const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!task) {
			return res.status(404).send;
		}
		res.send(task);
	} catch (e) {
		res.send(400).send(e);
	}
});

router.delete('/tasks/:id', auth, async (req, res) => {
	try {
        //const task = await Task.findByIdAndDelete(req.params.id);

        // we want to take account od task id and owner id
        const task = await Task.findOneAndDelete( { _id: req.params.id, owner:req.user._id})
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.send(500).send();
	}
});

module.exports = router;

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

// app.get('/tasks', (req, res) => {

// 	Task.find({}).then((tasks)=>{

//         res.send(tasks)

//     }).catch((error)=>{
//         res.status(500).send(error)

//     })
// })

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
