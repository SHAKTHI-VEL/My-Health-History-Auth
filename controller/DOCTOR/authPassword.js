const pool=require('../../DB/db');
const bcrypt=require('bcryptjs');

const authPassword=(req,res)=>{

    try {
        
    const {doctor_id,password}=req.body;

    if(!!(!password)){
        return res.status(404).json({sucess:false,message:"Password field missing"})
    }
    else{
    pool.query('SELECT doctor_password FROM public."HealthApp_doctor" WHERE doctor_id=$1',[doctor_id],async(err,response)=>{
        if(err){
            return res.status(500).json({sucess:"false",message:"Internal Server Error"})
        }
        
        else{
            if(response.rowCount==0){
                return res.status(401).json({sucess:false,message:`Doctor with id:-${doctor_id} doesn't exist`})
            }
            else if((response.rows[0].doctor_password)===(null)){
                return res.status(404).json({sucess:false,message:"Not generated Password yet"})
            }
            else{
                
                const secPass=response.rows[0].doctor_password;
                const compare=await bcrypt.compare(password,secPass);
                if(!compare){
                    return res.status(400).json({sucess:false,message:"Please try to login with correct credentials"});
                }else{
                    return res.status(200).json({sucess:true,doctor_id:doctor_id,message:"Credentials verified"})
                }
            }


        }
    })}
    } catch (error) {
        return res.status(500).json({sucess:"false",message:"Internal Server Error"})
    }


}


module.exports=authPassword;