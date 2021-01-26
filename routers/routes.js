const router=require('express').Router();
const { query } = require('express');
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
        res.json({message:"data inserted",runQuery})
    }
}catch(err){
   res.sendStatus(500)
   next(err)
}
})
module.exports=router;