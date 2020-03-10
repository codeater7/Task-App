const jwt = require('jsonwebtoken')
const User= require('../models/user')
const auth = async (req, res, next )=>{
    console.log('auth middlewate')
    try {
        // looks for user provided header
        const token = req.header('Authorization').replace('Bearer', '')
        // validates the  header
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // finds the associated user ( look for the user,check if this token is part of the token array)
        // tokens arrray ma token vanni khojxa, hamro value k 6 tyo 
        const user = await User.findOne({ _id: decoded._id, 'tokens.token':token})

        if (!user){
            throw new Error()
        }
        // when user is in multiple device we want to log out from 1 only
        req.token = token
        req.user = user
        next()

        

    } catch{
        res.send(400).send({ error: ' Please authenticate'})
    }
    next()
}
module.exports = auth