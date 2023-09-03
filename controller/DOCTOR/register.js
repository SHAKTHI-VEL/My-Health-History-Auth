const pool=require('../../DB/db');

const register=(req,res)=>{
    try {
        const {doctor_id,doctor_name,degree,doctor_number}=req.body;
        pool.query('SELECT * FROM public."HealthApp_doctor" WHERE doctor_id=$1',[doctor_id],(err,response)=>{
            if(!!(!doctor_id)){
                return res.status(500).json({success:"false",message:"Doctor_id is empty"})
            }
            if(!!(!doctor_name)){
                return res.status(500).json({success:"false",message:"Doctor_name is empty"})
            }
            if(!!(!degree)){
                return res.status(500).json({success:"false",message:"Degree is empty"})
            }
            if(!!(!doctor_number)){
                return res.status(500).json({success:"false",message:"Phone NO is empty"})
            }
            if(err){
                return res.status(500).json({success:"false",message:"Internal Server Error"})
            }
            else if(response.rowCount!=0){
                return res.status(404).json({success:"false",message:`Doctor with doctor_id ${doctor_id} already exist`})
            }
            else{
                pool.query('INSERT INTO public."HealthApp_doctor" (doctor_name,degree,doctor_id,doctor_number) VALUES($1,$2,$3,$4)',[doctor_name,degree,doctor_id,doctor_number],(err,response)=>{
                    if(err){
                        return res.status(500).json({success:"false",message:"Internal Server Error"})
                    }
                    else{
                        return res.status(200).json({success:"true",doctor_id:doctor_id})
                    }
                })
            }
        })



    } catch (error) {
        return res.status(500).json({success:"false",message:"Internal Server Error"})
    }
}

module.exports=register;