require('dotenv').config()
const express=require("express")
const ejs=require("ejs")
const bodyParser = require("body-parser")
const userModel=require("./user")


const app=express()

app.set('view engine','ejs')
app.use(express.static("./public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res) =>{
    res.render('home')
})
app.get("/login",(req,res) =>{
    res.render('login')
})
app.get("/register",(req,res) =>{
    res.render('register')
})


app.post('/login',async(req,res) =>{
    let email=req.body.username
    let pass=req.body.password

    let foundName=await userModel.findOne({email:email})

    if (foundName) {
        // Compare the provided password with the stored encrypted password
        if (pass === foundName.password) {
            res.render("secrets");
        } else {
            res.send("Wrong password");
        }
    } else {
        res.send("User not found");
    }



    // let foundPass=await userModel.findOne({password:pass})

    // if(foundName){
    //     if(foundPass){
    //         res.render("secrets")
    //     }else{
    //         // res.redirect("/login")
    //         res.send("Wrong pass")
    //     }
    // }else{
    //     // res.redirect("/login")
    //     res.send("Wrong email")
    // }

     
})

app.post('/register',async(req,res) =>{
    let email=req.body.username
    let pass=req.body.password

    let userCreated=await userModel.create({
        email:email,
        password:pass
    })
    res.render('secrets')
})



app.listen(3000)




