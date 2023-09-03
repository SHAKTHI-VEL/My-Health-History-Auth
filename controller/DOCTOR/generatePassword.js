const pool=require('../../DB/db');
const bcrypt=require('bcryptjs');

const generatePassword=async (req,res)=>{
    try {

        const {doctor_id,password}=req.body;


        if(!!(!password)){
            return res.status(404).json({success:false,message:"Password field missing"})
        }
        else{
        const salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(password,salt);

        pool.query('UPDATE public."HealthApp_doctor" set doctor_password=$1 WHERE doctor_id=$2 RETURNING doctor_name',[secPassword,doctor_id],(err,response)=>{
            if(err){
                return res.status(500).json({success:"false",message:"Internal Server Error"})
            }
            else{
                if(response.rowCount==0){
                    return res.status(401).json({success:false,message:`Doctor with id:-${doctor_id} doesn't exist`})
                }
                else{
                    const name=response.rows[0].doctor_name;
                    return res.status(201).json({success:true,doctor_id:doctor_id,name:name,accesslevel:"doctor",message:"Password updated successfully"})
                }
               
            }
        })
    }
        

    } catch (error) {
        return res.status(500).json({success:"false",message:"Internal Server Error"})
    }
}

module.exports=generatePassword;