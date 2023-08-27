const express=require('express');
const router=express.Router();

// Controllers
const generatePassword=require('../controller/DOCTORAUTH/generatePassword');
const authPassword=require('../controller/DOCTORAUTH/authPassword');

// @Desc:-Generate Password for Doctor 
// @route:-/doctor/generatepassword
router
.route('/generatepassword')
.post(generatePassword)

// @Desc:-Generate Password for Doctor 
// @route:-/doctor/authpassword
router
.route('/authpassword')
.post(authPassword)

module.exports=router;