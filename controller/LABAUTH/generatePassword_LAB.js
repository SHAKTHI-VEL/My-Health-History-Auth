const pool=require('../../DB/db');
const bcrypt=require('bcryptjs');

const generatePassword_LAB=async (req,res)=>{
    try {

        const {lab_id,password}=req.body;

        const salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(password,salt);

        pool.query('UPDATE public."HealthApp_lab" set lab_password=$1 WHERE lab_id=$2',[secPassword,lab_id],(err,response)=>{
            if(err){
                res.status(500).json({sucess:"false",message:"Internal Server Error"})
            }
            else{
                if(response.rowCount==0){
                    res.status(401).json({sucess:false,message:`Lab with id:-${lab_id} doesn't exist`})
                }
                else{
                    res.status(201).json({sucesss:true,lab_id:lab_id,message:"Password updated sucessfully"})
                }
               
            }
        })
        

    } catch (error) {
        res.status(500).json({sucess:"false",message:"Internal Server Error"})
    }
}

module.exports=generatePassword_LAB;