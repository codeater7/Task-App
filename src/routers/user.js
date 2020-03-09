const express = require('express')
const User= require('../models/user')
const auth = require( '../middleware/auth')
const router = new express.Router()


router.post('/users', async (req, res) => {
	const user = new User(req.body);
	// where does promise come from; user.save()

	try {
		await user.save();

		const token = await user.generateAuthToken()
		
		res.status(201).send({user, token });
	} catch (error) {
		res.status(400).send(error);
	}
	
});

router.post('/users/login', async( req, res)=>{
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password) // this was for the whole model SO user

		// but jwt verify is not, it has to be with each user, so we have to use the user instance
		const token = await user.generateAuthToken()

		// res.send({ user: user.getPublicProfile(), token}) first way to hide the data
		 res.send({ user, token})
		res.send({user, token})
		res.send({user, token})

	}
	catch{
		res.status(400).send()

	}
})
router.post('/users/logout', auth, async(req, res)=>{
	// just logginout from the just one device
	// filtering out the specific one
	try{
		req.user.tokens= req.user.tokens.filter((token)=>{
			return token.token !==req.token
		})
		await req.user.save()
		res.send()
	}catch{
		res.status(500).send()


	}
})
router.post('/users/logoutAll', auth , async (req,res)=>{
	try {
		// sap faldinee ho.. req.user.token = empty banako
		req.user.token = []
		await req.user.save()
	}catch (e){
		res.status(500).send()
	}
})


router.get('/users/me', auth, async (req, res) => {
	res.send(req.user)
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

router.patch('/users/me',  auth,  async(req,res)=>{
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
		// no need to fetch by the id instead we access req.user
		// have to make change to the callback code and want to use the existing user document on request
	
		updates.forEach((update)=>{
			req.user[update]= req.body[update]

		})
		await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id,  req.body, {new:true, runValidators:true})
        
        res.send(req.user)
    } catch(e){
        res.send(404).send(e)

    }
})
// should not able to provide the id of another user to delete them
router.delete('/users/me',auth,  async(req, res) =>{
    try{
		// through the auth middleware, we can acces the user
		// we attached user onto the req obejct
        //const user= await User.findByIdAndDelete(req.user._id)
        // if (!user){
        //     return res.status(404).send()
		// }
		req.user.remove()  // mathi ko kaam garxa
        res.send(req.user)

    }catch (e){
        res.send(500).send()

    }
})

module.exports = router