const pool=require('../../DB/db');

const authPatientOTP_UID=(req,res)=>{

    try {
        
        const {uid,otp}=req.body;

        if(!!(!otp)){
            return res.status(404).json({sucess:false,message:"OTP field missing"})
        }
    
        else{
        pool.query('SELECT otp,uid,name from public."HealthApp_patient" WHERE uid=$1',[uid],
        (err,response)=>{

            if(err){
                return res.status(500).json({sucess:"false",message:"Internal Server Error"})
            }

            if(response.rowCount==0){
                return res.status(401).json({sucess:false,message:`Patient with uid:-${uid} doesn't exist`})
            }

            if((response.rows[0].otp)===(null)){
               return res.status(404).json({sucess:false,message:"Not generated OTP yet"})
            }

            const db_otp=response.rows[0].otp;
            const id=response.rows[0].uid;
            const name=response.rows[0].name;
            if(otp==db_otp){
                return res.status(200).json({sucess:"true",uid:id,name:name,acesslevel:"patient",message:"OTP verified sucessfully"})
            }else{
                return res.status(500).json({sucess:"false",message:"Invalid OTP"})
            }
        
        })
    }

    } catch (error) {
        return res.status(500).json({sucess:"false",message:"Internal Server Error"})
    }

    
}

module.exports=authPatientOTP_UID;