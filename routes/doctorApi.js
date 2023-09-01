const express=require('express');
const router=express.Router();

// Controllers
const generatePassword=require('../controller/DOCTOR/generatePassword');
const authPassword=require('../controller/DOCTOR/authPassword');
const register=require('../controller/DOCTOR/register')
const update=require('../controller/DOCTOR/update')

// @Desc:-Generate Password for Doctor 
// @route:-/doctor/generatepassword
router
.route('/generatepassword')
.post(generatePassword)

// @Desc:-Authenticate Password for Doctor 
// @route:-/doctor/authpassword
router
.route('/authpassword')
.post(authPassword)


// @Desc:-Registration for Doctor 
// @route:-/doctor/register
router
.route('/register')
.post(register)


// @Desc:-Update Details of Doctor 
// @route:-/doctor/:id
router
.route('/:id')
.put(update)

module.exports=router;