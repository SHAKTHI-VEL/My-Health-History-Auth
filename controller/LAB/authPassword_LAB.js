const pool=require('../../DB/db');
const bcrypt=require('bcryptjs');

const authPassword_LAB=(req,res)=>{

    try {
        
    const {lab_id,password}=req.body;

    if(!!(!password)){
        return res.status(404).json({success:false,message:"Password field missing"})
    }

    else{

    pool.query('SELECT lab_password,lab_name FROM public."HealthApp_lab" WHERE lab_id=$1',[lab_id],async(err,response)=>{
        if(err){
           return res.status(500).json({success:"false",message:"Internal Server Error"})
        }
        else{
            
            if(response.rowCount==0){
                return res.status(401).json({success:false,message:`Lab with id:-${lab_id} doesn't exist`})
            }
            else if((response.rows[0].lab_password)===(null)){
                return res.status(404).json({success:false,message:"Not generated Password yet"})
            }
            else{
                const secPass=response.rows[0].lab_password;
                const name=response.rows[0].lab_name;
                const compare=await bcrypt.compare(password,secPass);
                if(!compare){
                    return res.status(400).json({success:false,message:"Please try to login with correct credentials"});
                }else{
                    return res.status(200).json({success:true,lab_id:lab_id,name:name,accesslevel:"lab",message:"Credentials verified"})
                }
            }


        }
    })
}
    } catch (error) {
       return res.status(500).json({success:"false",message:"Internal Server Error"})
    }


}


module.exports=authPassword_LAB;