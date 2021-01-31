const router=require('express').Router();
const {run}=require('../config/db');
const {schema}=require('../validation/validater')
router.post('/api',async (req,res,next)=>{
try{
    const result = schema.validate(req.body);
    console.log(result)
    if(result.errors){
        return res.sendStatus(422)
    }else{
       const data=result.value.pccData[0].itemData;
       console.log(data)
       const query=`insert into uno_notify_triggers (chCompanyId,vcModule,vcAction,vcTriggerJson,chStatus,nmCreatedOn,nmCreatedBy,nmUpdatedOn,nmUpdatedBy) values(?,?,?,?,?,?,?,?,?)`
       const arrayParams=[result.value.customerId,result.value.srcModuleName,result.value.notEventName,JSON.stringify(result.value.pccData),data.status,data.createdOn,data.createdBy,data.modifiedOn,data.modifiedBy]
        const runQuery = await run(query,arrayParams)
        res.status(200).json({message:"data inserted",runQuery})
    }
}catch(err){
   console.error(err)
   next(err)
}
})
router.patch("/api/:id",async (req,res,next) => {
    try{  
        const result=schema.validate(req.body);
        if(result.errors){
            return res.sendStatus(422);
        }else{
            console.log(req.params.id)
            const data=result.value.pccData[0].itemData;     
            console.log(data.status)           
            const query =`update uno_notify_triggers set chStatus=? where nmId=?`;
            const arrayParams =[data.status,req.params.id]
            const runQuery = await run(query,arrayParams)
            res.status(200).json({message:"data updated",runQuery})
                          }  
    }catch(err){
        console.error(err)
        next(err)
    }
})
router.get("/api/:id", async(req,res,next) => {
    try{
        const runQuery =await run(`select * from uno_notify_triggers where nmId=${req.params.id}`)
        res.status(200).json(runQuery)
    }catch(err){
        console.error(err)
        next(err)
    }
})
router.get("/api", async(req,res,next) => {
    try{
        const runQuery =await run(`select * from uno_notify_triggers`)
        res.status(200).json(runQuery)
    }catch(err){
        console.error(err)
        next(err)
    }
})
router.delete("/api/:id", async(req,res,next) => {
    try{
        const runQuery =await run(`delete  from uno_notify_triggers where nmId=${req.params.id}`)
        res.status(200).json({message:"deleted successfully",runQuery})
    }catch(err){
        console.error(err)
        next(err)
    }
})
module.exports=router;