const pool=require('../../DB/db');

const update=(req,res)=>{
    try {
        const lab_id=req.params.id;
        const {lab_address,lab_phone}=req.body;

        pool.query('SELECT * FROM public."HealthApp_lab" WHERE lab_id=$1',[lab_id],(err,response)=>{
            if(err){
                console.log(err);
            }
            else if(response.rowCount==0){
                return res.status(404).json({success:"false",message:`Lab with lab_id ${lab_id} does not exist`})
            }
            else if(!!(!lab_address)){
                pool.query('UPDATE public."HealthApp_lab" SET lab_phone=$1 WHERE lab_id=$2',[lab_phone,lab_id],(err,response)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        return res.status(200).json({success:true,message:"Updated successfully"})
                    }
                })
            }

            else if(!!(!lab_phone)){
                pool.query('UPDATE public."HealthApp_lab" SET lab_address=$1 WHERE lab_id=$2',[lab_address,lab_id],(err,response)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        return res.status(200).json({success:true,message:"Updated successfully"})
                    }
                })
            }

            else{
                pool.query('UPDATE public."HealthApp_lab" SET lab_address=$1,lab_phone=$2 WHERE lab_id=$3',[lab_address,lab_phone,lab_id],(err,response)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        return res.status(200).json({success:true,message:"Updated successfully"});
                    }
                })
            }
        })




                
            
        

       

    } catch (error) {
        return res.status(500).json({success:"false",message:"Internal Server Error"})
    }
}

module.exports=update;