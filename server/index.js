const express=require("express")
const db=require("../server/db")
const app=express()

app.use(express.json())


app.listen(8080,()=>{
    console.log("server is connect")
})
