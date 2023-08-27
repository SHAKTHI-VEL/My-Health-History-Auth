const pool=require('../../DB/db');
const bcrypt=require('bcryptjs');

const authPassword_LAB=(req,res)=>{

    try {
        
    const {lab_id,password}=req.body;

    pool.query('SELECT lab_password FROM public."HealthApp_lab" WHERE lab_id=$1',[lab_id],async(err,response)=>{
        if(err){
           return res.status(500).json({sucess:"false",message:"Internal Server Error"})
        }
        else{
            
            if(response.rowCount==0){
                return res.status(401).json({sucess:false,message:`Lab with id:-${lab_id} doesn't exist`})
            }
            else if((response.rows[0].lab_password)===(null)){
                return res.status(404).json({sucess:false,message:"Not generated Password yet"})
            }
            else{
                const secPass=response.rows[0].lab_password;
                const compare=await bcrypt.compare(password,secPass);
                if(!compare){
                    return res.status(400).json({sucess:false,message:"Please try to login with correct credentials"});
                }else{
                    return res.status(200).json({sucess:true,lab_id:lab_id,message:"Credentials verified"})
                }
            }


        }
    })
    } catch (error) {
       return res.status(500).json({sucess:"false",message:"Internal Server Error"})
    }


}


module.exports=authPassword_LAB;