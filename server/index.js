const express=require("express")
const db = require("../server/db")

const app=express()
app.use(express.json())


app.post("/post",(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.json({message:"please add email and password"})
    }
    const sql="INSERT INTO users (email,password,is_deleted) VALUES ( ? , ? , 0 )";
    db.query(sql,[email,password ],(err,result)=>{
        if(err)return res.send(err)
            res.send("user add")
    })
})


app.get("/",(req,res)=>{
    db.query("SELECT * FROM users WHERE is_deleted = 0",(err,result)=>{
        if(err) return res.send(err)
            res.send(result)
    })
})

app.delete("/delete/:id",(req,res)=>{
    const id=req.params.id
    const sql="UPDATE users SET is_deleted = 1 WHERE id = ?"
    db.query(sql,[id],(err,result)=>{
        if(err) return res.send(err)    
        res.send("User Soft Deleted successfully")
    })
})

app.put("/update/:id",(req,res)=>{
    const id = req.params.id
    const {email,password}=req.body
    
    
    const sql = "UPDATE users SET email=? , password = ?  WHERE id=?"

    db.query(sql,[email,password ,id],(err,result)=>{
        if(err) return res.send(err)
        res.send("update user data")
    })
})

app.post("/postProfile",(req,res)=>{
    const {user_id , phone , city}=req.body
    const sql="INSERT INTO profiles (user_id , phone , city) VALUES ( ? , ? , ?)"
    db.query(sql,[user_id,phone,city],(err)=>{
        if(err) return  res.send(err)
            res.send("data post on profile")
    })
})

app.get("/profile",(req,res)=>{
    const sql = "SELECT * FROM profiles"
    db.query(sql,(err,result)=>{
        if(err) return  res.send(err)
            res.send(result)
    })
})

app.get("/user-profile",(req,res)=>{
    const sql=`
        SELECT users.id,users.email,profiles.phone,profiles.city
        FROM users
        JOIN profiles ON users.id= profiles.user_id
        WHERE users.is_deleted=0
    `;
    db.query(sql,(err,result)=>{
        if(err) return  res.send(err)
            res.send(result)
    })
})

app.get("/left-user",(req,res)=>{
    const sql=`
        SELECT users.id , users.email, profiles.phone , profiles.city
        FROM users
        LEFT JOIN profiles ON users.id=profiles.user_id
        WHERE users.is_deleted=0
    `;

    db.query(sql,(err,result)=>{
        if(err) return  res.send(err)
        res.send(result)
    })
})

app.get("/right-user",(req,res)=>{
    const sql=`
        SELECT users.id , users.email, profiles.phone , profiles.city
        FROM users
        RIGHT JOIN profiles ON users.id = profiles.user_id
    `;

    db.query(sql,(err,result)=>{
        if(err) return  res.send(err)
        res.send(result)
    })
})

app.listen(8080,()=>{
    console.log("server is connenct ")
})