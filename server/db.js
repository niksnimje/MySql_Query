const mysql=require("mysql2")

const db=mysql.createConnection({
    host:"loacalhost",
    user:"root",
    password:"",
    database:"test"
})

db.connect((err)=>{
    if(err){
        console.log("DB not connect")
    }
    else{
        console.log("DB Is Connect Successfull")
    }
})

module.exports=db