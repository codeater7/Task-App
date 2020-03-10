const express = require('express')
const User= require('../models/user')
const auth = require( '../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail, sendCancelationEmail} = require('../emails/account')


router.post('/users', async (req, res) => {
	const user = new User(req.body);
	// where does promise come from; user.save()

	try {
		await user.save();
		sendWelcomeEmail(user.email, user.name)

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
		sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)

    }catch (e){
        res.send(500).send()

    }
})
const upload = multer({
	
	limits: { fileSize:1000000},
	//request being made, info about file being uploaded 
	fileFilter (req, file, cb){
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
			return cb (new Error('Please upload a Word document'))

		}
		cb (undefined, true)
		// cb( new Error('file must be a PDF'))
		// // undefined-nothing went wrong, true if upload is to be expected
		// cb (undefined, true)
		// cb (undefined, false)


	}
})

// lets create middleware upload.single middleware elsewhere
router.post('/users/me/avatar', auth, upload.single('avatar') , async(req, res)=>{
	// data is excessible in access.file.buffer
	//storing in (user) avatar field; i.e req.user.avatar

	//req.user.avatar= req.file.buffer

	//buffer is the modified data, 
	const buffer=  await sharp(req.file.buffer).resize({ width:250, height:250}).png().toBuffer()
	req.user.avatar= buffer

	await req.user.save()
	res.send()

}, (error, req, res, next)=>{
	res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async(req, res)=>{
	//set the field to undefined and save teh user sending back a 200
	req.user.avatar= undefined
	await req.user.save()
	res.send()
})

// serving up the files
router.get('/users/:id/avatar', async(req, res)=>{
 try {
	 const user = await User.findById(req.params.id)
	 if (!user || !user.avatar){
		 throw new Error()

	 }

	 //what kind of image they get // have to set the response header
	 //set(key:value)
	 res.set('Content-Type', 'image/png')
	 res.send(user.avatar)

 }catch (e){
	 res.s
	 tatus(404).send()

 }
})

module.exports = router