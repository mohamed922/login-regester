
const mongoose = require("mongoose");
const User = mongoose.model("User")
const password = require('passport')
const _ = require('lodash')
//registeration
module.exports.register = (req,res,next)=> {
    const user = new User() ;
    user.fullName = req.body.fullName ;
    user.email = req.body.email;
    user.password = req.body.password ;
    user.save((err,doc)=>{
        if(!err) res.send(doc)
        else {
            if(err.code == 11000) {
                res.status(422).send("this email is already registered ")
            
        }else  return next(err)
        
    }
   
    }) ;
}
// authentication
module.exports.authentication = (req,res,next)=> {
 password.authenticate('local' , (err,user,info)=>{
       if(err) res.status(400).json(err)
       else if(user) res.status(200).json({token : user.generatedToken()})
       else res.status(404).json(info)
 })(req,res)
}
module.exports.userProfile = (req,res,next)=> {
    console.log(req._id)
    User.findOne({ _id: req._id } , (err,user)=>{
        if(!user) res.status(404).json({message:'user not found '}) ;
        else res.status(200).json({user : _.pick(user , ['fullName' , 'email'])
    })
    })
}