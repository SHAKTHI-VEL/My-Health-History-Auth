const pool=require('../../DB/db');

const authPatientOTP_PHNO=(req,res)=>{
    try {
        
        const {phone_no,otp}=req.body;

        if(!!(!otp)){
            return res.status(404).json({success:false,message:"OTP field missing"})
        }
        else{
    

        pool.query('SELECT otp,uid,name from public."HealthApp_patient" WHERE phone=$1',[phone_no],
        (err,response)=>{

            if(err){
                return res.status(500).json({success:"false",message:"Internal Server Error"})
            }
            else if(response.rowCount==0){
                return res.status(401).json({success:false,message:`Patient with phone_no:-${phone_no} doesn't exist`})
            }

            else if((response.rows[0].otp)===(null)){
               return res.status(404).json({success:false,message:"Not generated OTP yet"})
            }

            const db_otp=response.rows[0].otp;
            const id=response.rows[0].uid;
            const name=response.rows[0].name;

            if(otp==db_otp){
                return res.status(200).json({success:"true",uid:id,name:name,accesslevel:"patient",message:"OTP verified successfully"})
            }else{
                return res.status(500).json({success:"false",message:"Invalid OTP"})
            }
        
        })
    }
    } catch (error) {
        return res.status(500).json({success:"false",message:"Internal Server Error"})
    }
}

module.exports=authPatientOTP_PHNO;