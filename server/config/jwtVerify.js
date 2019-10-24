const jwt = require('jsonwebtoken') ;

module.exports.auth = (req,res,next)=> {
    var token  ;
    if('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1] ;
        console.log(token)
        if(!token) res.status(403).json({message : 'no token provided'})
       
            jwt.verify(token , process.env.secret_token ,(err,decoded) =>{
            if(err) res.status(500).json({message:'authentication failed'}) ;
            else {
                 req._id = decoded._id 
               next()
            }
        
        })
    
    }
}