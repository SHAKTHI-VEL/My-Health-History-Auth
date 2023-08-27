const pool=require("../../DB/db");
const nodemailer=require('nodemailer');
const dotenv=require('dotenv').config();

const generatePatientOTP_UID=(req,res)=>{
    try {
        let otp=Math.floor(1000 + (9999 - 1000) * Math.random());

        const {uid}=req.body;

        pool.query('UPDATE public."HealthApp_patient" set otp=$1 WHERE uid=$2 RETURNING email',[otp,uid],
        (err,response)=>{
    
            if(err){
               return res.status(500).json({sucess:'false',message:"Internal server error"})
                }
    
                if(response.rowCount===0){
                   return res.status(404).json({sucess:'false',"message":"user not found"})
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
                        return res.status(501).json({sucess:'false'})
                    } else {
            
                       return res.status(200).json({sucess:'true',message:'Email sent successfully'})
                        
                    }
                });
                return res.status(200).json({sucess:"true",message:"OTP sent sucessfully"})
            }
        })
    }catch (error) {
        return res.status(500).json({sucess:"false",message:"Internal Server Error"})
    }
}

module.exports=generatePatientOTP_UID;