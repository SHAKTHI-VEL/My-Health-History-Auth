const express=require('express');
const router=express.Router();

// Controllers
const authPassword=require('../controller/LABAUTH/authPassword_LAB')
const generatepassword=require('../controller/LABAUTH/generatePassword_LAB')

// @Desc:-Generate Password for Doctor 
// @route:-/doctor/generatepassword
router
.route('/generatepassword')
.post(generatepassword)

// @Desc:-Auth Password for Lab
// @route:-/lab/authpassword
router
.route('/authpassword')
.post(authPassword)

module.exports=router;