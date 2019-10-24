const mongoose = require("mongoose");
const bcrypt = require("bcryptjs") ;
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    fullName: {
        type: String ,
        required:"name can/'t be empty"

    },
    email: {
        type: String ,
        unique : true ,

    },
    password: {
        type: String ,
        minlength:[4 , "password can/'t be less than 4 "]

    },
    saltPassword: {
        type: String ,

    },
});

userSchema.path('email').validate((val)=>{
    const emailregx =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailregx.test(val);
}, 'invalid email address ')

userSchema.pre('save',function (next){
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(this.password, salt,(err,hash)=>{
        this.password = hash ;
        this.saltPassword = salt ;
        next();
    });
});
});
userSchema.methods.verifyPassword = function(password) {
   return  bcrypt.compareSync(password , this.password)
}
userSchema.methods.generatedToken = function() {
 return jwt.sign({_id: this._id}, process.env.secret_token ,{expiresIn : process.env.token_exp})
}

mongoose.model('User',userSchema)