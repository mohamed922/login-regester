const passport = require('passport') ;
const localStratigy = require('passport-local').Strategy ;
const mongoose = require('mongoose');
const User = mongoose.model('User') ;

passport.use(new localStratigy(
    {usernameField:'email'},(username,password,done)=>{
      User.findOne({email : username},(err,user)=>{
          if(err) return done(err) ;
          else if(!user) return done(null,false,{message:'this email is not registered please register'}) ;
          else if(!user.verifyPassword(password)) return done(null,false,{message: ' wrong password '});
          else return done(null,user)
      })
}));