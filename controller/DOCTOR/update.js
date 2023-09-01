const pool=require('../../DB/db');

const update=(req,res)=>{
    try {
        const doctor_id=req.params.id;
        const {degree,doctor_number}=req.body;

        pool.query('SELECT * FROM public."HealthApp_doctor" WHERE doctor_id=$1',[doctor_id],(err,response)=>{
            if(err){
                console.log(err);
            }
            else if(response.rowCount==0){
                return res.status(404).json({sucess:"false",message:`doctor with doctor_id ${doctor_id} does not exist`})
            }
            else if(!!(!degree)){
                pool.query('UPDATE public."HealthApp_doctor" SET doctor_number=$1 WHERE doctor_id=$2',[doctor_number,doctor_id],(err,response)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        return res.status(200).json({sucess:true,message:"Updated Sucessfully"})
                    }
                })
            }

            else if(!!(!doctor_number)){
                pool.query('UPDATE public."HealthApp_doctor" SET degree=$1 WHERE doctor_id=$2',[degree,doctor_id],(err,response)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        return res.status(200).json({sucess:true,message:"Updated Sucessfully"})
                    }
                })
            }

            else{
                pool.query('UPDATE public."HealthApp_doctor" SET degree=$1,doctor_number=$2 WHERE doctor_id=$3',[degree,doctor_number,doctor_id],(err,response)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        return res.status(200).json({sucess:true,message:"Updated Sucessfully"});
                    }
                })
            }

        })

               
            
        

       

    } catch (error) {
        return res.status(500).json({sucess:"false",message:"Internal Server Error"})
    }
}

module.exports=update;