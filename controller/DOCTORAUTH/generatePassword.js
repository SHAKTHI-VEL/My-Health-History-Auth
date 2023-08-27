const pool=require('../../DB/db');
const bcrypt=require('bcryptjs');

const generatePassword=async (req,res)=>{
    try {

        const {doctor_id,password}=req.body;

        const salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(password,salt);

        pool.query('UPDATE public."HealthApp_doctor" set doctor_password=$1 WHERE doctor_id=$2',[secPassword,doctor_id],(err,response)=>{
            if(err){
                res.status(500).json({sucess:"false",message:"Internal Server Error"})
            }
            else{
                if(response.rowCount==0){
                    res.status(401).json({sucess:false,message:`Doctor with id:-${doctor_id} doesn't exist`})
                }
                else{
                    res.status(201).json({sucesss:true,doctor_id:doctor_id,message:"Password updated sucessfully"})
                }
               
            }
        })
        

    } catch (error) {
        res.status(500).json({sucess:"false",message:"Internal Server Error"})
    }
}

module.exports=generatePassword;