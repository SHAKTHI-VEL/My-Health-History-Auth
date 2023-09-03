const pool=require('../../DB/db');
const bcrypt=require('bcryptjs');

const generatePassword_LAB=async (req,res)=>{
    try {

        const {lab_id,password}=req.body;

        if(!!(!password)){
            return res.status(404).json({success:false,message:"Password field missing"})
        }
        
        else{

        const salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(password,salt);

        pool.query('UPDATE public."HealthApp_lab" set lab_password=$1 WHERE lab_id=$2 RETURNING lab_name',[secPassword,lab_id],(err,response)=>{
            if(err){
                return res.status(500).json({success:"false",message:"Internal Server Error"})
            }
            else{
                if(response.rowCount==0){
                    return res.status(401).json({success:false,message:`Lab with id:-${lab_id} doesn't exist`})
                }
                else{
                    const name=response.rows[0].lab_name;
                    return res.status(201).json({success:true,lab_id:lab_id,name:name,acesslevel:"lab",message:"Password updated successfully"})
                }
               
            }
        })
        
    }
    } catch (error) {
        return res.status(500).json({success:"false",message:"Internal Server Error"})
    }
}

module.exports=generatePassword_LAB;