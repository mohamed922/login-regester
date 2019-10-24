const mongoose = require("mongoose");
 require("./user.model");
// connect to database
mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true , useUnifiedTopology: true ,useCreateIndex: true }, (err)=>{
    if(!err) {console.log("DB connected successfully ....")}
    else{console.log("DB connection failed ....")}
    
})