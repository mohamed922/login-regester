require("./config/config");
require("./modals/db");
require('./config/passportConfig')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport')
const app = express() ;
const router = require("./router/index")

//middleware 
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize())
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With , Content-Type , Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
}) ;
app.use("/API",router) ;
//handel errors 
app.use((err,req,res,next)=>{
    if(err.name === "ValidationError") {
        let errors = [] ;
        Object.keys(err.errors).forEach(key=> {
            errors.push(err.errors[key].message) 
        })
        res.status(422).send(errors)
    }
})
// start server
app.listen(process.env.PORT, ()=> console.log(`server running in port :${process.env.PORT}`))