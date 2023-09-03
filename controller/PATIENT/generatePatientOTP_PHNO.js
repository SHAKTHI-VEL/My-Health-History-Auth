const pool=require("../../DB/db");
const nodemailer=require('nodemailer');
const dotenv=require('dotenv').config();

const generatePatientOTP_PHNO=(req,res)=>{
    try {
        let otp=Math.floor(1000 + (9999 - 1000) * Math.random());

        const {phone_no}=req.body;

        if(!!(!phone_no)){
            return res.status(404).json({success:false,message:"Phone_NO field missing"})
        }

        else{

        pool.query('UPDATE public."HealthApp_patient" set otp=$1 WHERE phone=$2 RETURNING email',[otp,phone_no],
        (err,response)=>{
    
            if(err){
                return res.status(500).json({success:'false',message:"Internal server error"})
                }
    
                if(response.rowCount===0){
                   return res.status(404).json({success:'false',"message":"user not found"})
                }
    
            else{
                let mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.user,
                        pass: process.env.pass
                    }
                });
                
                let mailDetails = {
                    from: 'organizationk14@gmail.com',
                    to: response.rows[0].email,
                    subject: 'Your ERP need to be verified',
                    html:`<h1>Hi,</h1>
                    <h1>Your ERP Email Verification OTP :- ${otp}</h1>
                    `
                };
                mailTransporter.sendMail(mailDetails, function(err, data) {
                    if(err) {
                       return res.status(501).json({success:'false',message:'Some Error Occured'})
                    } else {
                       return res.status(200).json({success:'true',message:'Email sent successfully'})
                        
                    }
                });
                return res.status(200).json({success:"true",message:"OTP sent successfully"})
            }
        })
    }
    }catch (error) {
        return res.status(500).json({success:"false",message:"Internal Server Error"})
    }
}

module.exports=generatePatientOTP_PHNO;