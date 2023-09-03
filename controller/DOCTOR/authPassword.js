const pool=require('../../DB/db');
const bcrypt=require('bcryptjs');

const authPassword=(req,res)=>{

    try {
        
    const {doctor_id,password}=req.body;

    if(!!(!password)){
        return res.status(404).json({success:false,message:"Password field missing"})
    }
    else{
    pool.query('SELECT doctor_password,doctor_name FROM public."HealthApp_doctor" WHERE doctor_id=$1',[doctor_id],async(err,response)=>{
        if(err){
            return res.status(500).json({success:"false",message:"Internal Server Error"})
        }
        
        else{
            if(response.rowCount==0){
                return res.status(401).json({success:false,message:`Doctor with id:-${doctor_id} doesn't exist`})
            }
            else if((response.rows[0].doctor_password)===(null)){
                return res.status(404).json({success:false,message:"Not generated Password yet"})
            }
            else{
                const name=response.rows[0].doctor_name;
                const secPass=response.rows[0].doctor_password;
                const compare=await bcrypt.compare(password,secPass);
                if(!compare){
                    return res.status(400).json({success:false,message:"Please try to login with correct credentials"});
                }else{
                    return res.status(200).json({success:true,doctor_id:doctor_id,name:name,accesslevel:"doctor",message:"Credentials verified"})
                }
            }


        }
    })}
    } catch (error) {
        return res.status(500).json({success:"false",message:"Internal Server Error"})
    }


}


module.exports=authPassword;