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
       const store=result;
       const query=`insert into triggers values(?,?,?,?,?)`
       const arrayParams=[store.value.customerId,store.value.requesterId,store.value.notEventName,store.value.requestItemId,store.value.srcModuleName]
        const runQuery = await run(query,arrayParams)
        res.send(200).json({message:"data inserted",runQuery})
    }
}catch(err){
   console.error(err)
   next(err)
}
})
router.patch("/api",async (req,res,next) => {
    try{        
      const store=result;                
      const query =`update triggers set requesterId=?, notEventName=?, requestItemId=?, srcModuleName=? where customerId=?`;
      const arrayParams =[store.value.requesterId,store.value.notEventName,store.value.requestItemId,store.value.srcModuleName,store.value.customerId]
      const runQuery = await run(query,arrayParams)
      res.send(200).json({message:"data updated",runQuery})
                
    }catch(err){
        console.error(err)
        next(err)
    }
})
router.get("/api/:id", async(req,res,next) => {
    try{
        const runQuery =await run(`select * from triggers where customerId=${req.params.id}`)
        res.status(200).json(runQuery)
    }catch(err){
        console.error(err)
        next(err)
    }
})
router.get("/api", async(req,res,next) => {
    try{
        const runQuery =await run(`select * from triggers`)
        res.status(200).json(runQuery)
    }catch(err){
        console.error(err)
        next(err)
    }
})
router.delete("/api/:id", async(req,res,next) => {
    try{
        const runQuery =await run(`delete  from triggers where customerId=${req.params.id}`)
        res.status(200).json({message:"deleted successfully",runQuery})
    }catch(err){
        console.error(err)
        next(err)
    }
})
module.exports=router;