const {createPool} = require('mysql');
const pool=createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
})
pool.getConnection((err)=>{
    if(err){
        console.log('error connecting to database ' + err)
    }else
    {
    console.log('connected...')
    }
})
const run=(query,arrayParams)=>{
    return new Promise((resolve,reject)=>{
        try{
         pool.query(query,arrayParams,(err,rows)=>{
             if(err) return reject(err)
             console.log(rows)
             resolve(rows)
         })
        }catch(err){
             reject(err)
        }
    })
}
module.exports={run};