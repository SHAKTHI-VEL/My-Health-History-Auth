const express=require('express');
const router=express.Router();

// Controllers
const generateOTP_UID=require('../controller/PATIENT/generatePatientOTP_UID');
const generateOTP_PHNO=require('../controller/PATIENT/generatePatientOTP_PHNO');
const authOTP_UID=require('../controller/PATIENT/authPatientOTP_UID');
const authPatientOTP_PHNO=require('../controller/PATIENT/authPatientOTP_PHNO');


// @Desc:-Generate OTP by using UID
// @Route:-/patient/generateotp
router
.route('/generateotp_uid')
.post(generateOTP_UID)

// @Desc:-Authenticate OTP by using UID
// @Route:-/patient/authotp
router
.route('/authotp_uid')
.post(authOTP_UID)

// @Desc:-Authenticate OTP by using PH_NO
// @Route:-/patient/authotp_phno
router
.route('/authotp_phno')
.post(authPatientOTP_PHNO)

// @Desc:-Generate OTP by using PH_NO
// @Route:-/patient/generateotp_phno
router
.route('/generateotp_phno')
.post(generateOTP_PHNO)


module.exports=router;