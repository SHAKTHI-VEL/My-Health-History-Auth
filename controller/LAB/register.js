const pool=require('../../DB/db');

const register=(req,res)=>{
    try {
        const {lab_id,lab_name,lab_address,lab_phone}=req.body;
        pool.query('SELECT * FROM public."HealthApp_lab" WHERE lab_id=$1',[lab_id],(err,response)=>{
            if(!!(!lab_id)){
                return res.status(500).json({sucess:"false",message:"lab_id is empty"})
            }
            if(!!(!lab_name)){
                return res.status(500).json({sucess:"false",message:"lab_name is empty"})
            }
            if(!!(!lab_address)){
                return res.status(500).json({sucess:"false",message:"Lab Address is empty"})
            }
            if(!!(!lab_phone)){
                return res.status(500).json({sucess:"false",message:"Phone NO is empty"})
            }
            if(err){
                return res.status(500).json({sucess:"false",message:"Internal Server Error"})
            }
            else if(response.rowCount!=0){
                return res.status(404).json({sucess:"false",message:`lab with lab_id ${lab_id} already exist`})
            }
            else{
                pool.query('INSERT INTO public."HealthApp_lab" (lab_id,lab_name,lab_address,lab_phone) VALUES($1,$2,$3,$4)',[lab_id,lab_name,lab_address,lab_phone],(err,response)=>{
                    if(err){
                        return res.status(500).json({sucess:"false",message:"Internal Server Error"})
                    }
                    else{
                        return res.status(200).json({sucess:"true",lab_id:lab_id})
                    }
                })
            }
        })



    } catch (error) {
        return res.status(500).json({sucess:"false",message:"Internal Server Error"})
    }
}

module.exports=register;