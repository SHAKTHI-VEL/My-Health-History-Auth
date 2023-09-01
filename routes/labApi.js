const express=require('express');
const router=express.Router();

// Controllers
const authPassword=require('../controller/LAB/authPassword_LAB')
const generatepassword=require('../controller/LAB/generatePassword_LAB')
const register=require('../controller/LAB/register')
const update=require('../controller/LAB/update')

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

// @Desc:-Registration for Lab
// @route:-/lab/register
router
.route('/register')
.post(register)

// @Desc:-Update Details of Lab 
// @route:-/lab/:id
router
.route('/:id')
.put(update)

module.exports=router;