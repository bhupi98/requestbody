require('dotenv').config();
const express= require('express')
const api= require('./routers/routes')
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',api)

app.listen(process.env.SERVER_PORT,()=>console.log("server listening on " + process.env.SERVER_PORT))