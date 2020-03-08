const express = require('express')
const User= require('../models/user')
const router = new express.Router()


router.post('/users', async (req, res) => {
	const user = new User(req.body);
	// where does promise come from; user.save()

	try {
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
	
});

router.post('/users/login', async( req, res)=>{
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		res.send(user)

	}
	catch{
		res.status(400).send()

	}
})


router.get('/users', async (req, res) => {
	try {
		const users = User.find({});
		res.send(users);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/users/:id', async (req, res) => {
	//param ko bata taha huna parnee ho ni ta
	const _id = req.params.id;
	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

// Patch
//findByIdAndUpdate(which id?, with what(it comes from req.body), we want to give new use and run validator)

router.patch('/users/:id', async(req,res)=>{
//     sujan {height: 45, weight: 35}
// Object.keys(sujan)
// (2) ["height", "weight"]

    const updates = Object.keys(req.body) // will bring only keys into array
    const allowedUpdates= ['name', 'email', 'password', 'age']
    const isValidOperation= updates.every((update)=>{
        return allowedUpdates.includes(update)

    }) 
    if(!isValidOperation){
        return res.send(400).send({error:'Invalid updates!!'})
    }

    try{
		const user = await User.findById(req.params.id)
		updates.forEach((update)=>{
			user[update]= req.body[update]

		})
		await user.save()
        //const user = await User.findByIdAndUpdate(req.params.id,  req.body, {new:true, runValidators:true})
        if (!user){
            return res.status(404).send
        }
        res.send(user)
    } catch(e){
        res.send(404).send(e)

    }
})

router.delete('/users/:id', async(req, res) =>{
    try{
        const user= await User.findByIdAndDelete(req.params.id)
        if (!user){
            return res.status(404).send()
        }
        res.send(user)

    }catch (e){
        res.send(500).send()

    }
})

module.exports = router