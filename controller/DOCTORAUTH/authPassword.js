const pool=require('../../DB/db');
const bcrypt=require('bcryptjs');

const authPassword=(req,res)=>{

    try {
        
    const {doctor_id,password}=req.body;

    pool.query('SELECT doctor_password FROM public."HealthApp_doctor" WHERE doctor_id=$1',[doctor_id],async(err,response)=>{
        if(err){
            res.status(500).json({sucess:"false",message:"Internal Server Error"})
        }
        if((response.rows[0].lab_password)===(null)){
            res.status(404).json({sucess:false,message:"Not generated Password yet"})
        }
        else{
            if(response.rowCount==0){
                res.status(401).json({sucess:false,message:`Doctor with id:-${doctor_id} doesn't exist`})
            }else{
                const secPass=response.rows[0].doctor_password;
                const compare=await bcrypt.compare(password,secPass);
                if(!compare){
                    return res.status(400).json({sucess:false,message:"Please try to login with correct credentials"});
                }else{
                    return res.status(200).json({sucess:true,doctor_id:doctor_id,message:"Credentials verified"})
                }
            }


        }
    })
    } catch (error) {
        res.status(500).json({sucess:"false",message:"Internal Server Error"})
    }


}


module.exports=authPassword;