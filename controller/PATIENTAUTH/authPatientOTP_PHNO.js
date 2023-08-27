const pool=require('../../DB/db');

const authPatientOTP_PHNO=(req,res)=>{
    try {
        
        const {phone_no,otp}=req.body;

        pool.query('SELECT otp,uid from public."HealthApp_patient" WHERE phone=$1',[phone_no],
        (err,response)=>{

            if(err){
                res.status(500).json({sucess:"false",message:"Internal Server Error"})
            }

            if((response.rows[0].otp)===(null)){
                res.status(404).json({sucess:false,message:"Not generated OTP yet"})
            }

            const db_otp=response.rows[0].otp;
            const id=response.rows[0].uid;
            if(otp==db_otp){
                res.status(200).json({sucess:"true",uid:id,message:"OTP verified sucessfully"})
            }else{
                res.status(500).json({sucess:"false",message:"Invalid OTP"})
            }
        
        })

    } catch (error) {
        res.status(500).json({sucess:"false",message:"Internal Server Error"})
    }
}

module.exports=authPatientOTP_PHNO;