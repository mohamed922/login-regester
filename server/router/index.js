const express = require("express") ;
const router = express.Router() ;
const ctrlUser = require("../controller/user.controller") ;
const jwtHelper = require('../config/jwtVerify')

router.post('/register', ctrlUser.register) ;
router.post('/authenticate', ctrlUser.authentication) ;
router.get('/userprofile',jwtHelper.auth, ctrlUser.userProfile) ;


module.exports = router ;