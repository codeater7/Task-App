const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task= require('./task')



const userSchema = new mongoose.Schema({
	name: { type: String,required: true, trim: true,
	},

	email: { type: String, unique:true, required: true, trim: true, lowercase: true,
		validate(value) {
		
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		},
	},
	password: {type: String, required: false, minlength: 7,trim: true,
		validate(value) {
			// running validator
			if (value.toLowerCase().includes('password')) {
				throw new Error('password cannot contain "password');
			}
		},
	},
	age: { type: Number, default: 0, 
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number');
			}
		},
	},
	// we are also tracking the token, it has the token property
	tokens: [{
		token: { type: String, required:true}
	}],
	// keeping the image in the file system
	avatar: {
			type: Buffer // binary image data
	}

}, {
	timestamps:true
})
// Virtual Property
// Virtual Property is not actual data stored in data, it is the relationship between two entity
// here we have relationship between Task and user on virtual, not stored in database
// it is just for mongoose to be able to figure who owns what and how they are related

// userSchema.virtual( any name, object) 


userSchema.virtual('tasks', {
	ref: 'Task',
	localField:'_id',   // where local data is stored, we have owner object id on task, 
	// that is associated with _id of user here in the model
	foreignField:'owner' //name of the field on other field, arko model ma owner vanera 6 ni
})
// first way to do, manual
// userSchema.methods.getPublicProfile = function (){

// 	// is is sendingthe password and tokens, just we are not sending that doing the following
// 	const user = this
// 	const userObject = user.toObject()

// 	delete userObject.password
// 	delete userObject.tokens

// 	return userObject
// }

userSchema.methods.toJSON = function (){

	// is is sendingthe password and tokens, just we are not sending that doing the following
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens
	delete userObject.avatar


	return userObject
}
//methods are accessible to the instances
//instance method
userSchema.methods.generateAuthToken = async function(){
	const user = this
	const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
	user.tokens= user.tokens.concat({ token : token})
	await user.save()
	return token

}


//by setting the value here, we were able to get directly in the model
//statics used for the model, model methods

userSchema.statics.findByCredentials= async (email, password)=>{
	//find user by email
	const user = await User.findOne({email})
	if (!user){
		throw new Error('Unable to login')
	}
	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch){
		throw new Error('Unable to login')
	}
	return user

}

// Hash the plain text password before saving
// before validation (pre) // after post 
//  Arrow function wont bind this
//userSchema.pre(name of the event, )
userSchema.pre('save', async function ( next){
	const user = this

	if (user.isModified('password')){
		user.password = await bcrypt.hash(user.password, 0)
	}
	console.log('just before saving')
	next()
})
//Delete user tasks when the user is removed
userSchema.pre('remove', async function (next){
	const user= this
	await Task.deleteMany({owner:user._id})
	next()
})
const User = mongoose.model('User',userSchema );

module.exports = User;




