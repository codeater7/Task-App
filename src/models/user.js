const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt= require('bcryptjs')


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
})
//by setting the value here, we were able to get directly in the model

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
const User = mongoose.model('User',userSchema );

module.exports = User;




