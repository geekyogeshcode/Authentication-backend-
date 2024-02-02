require("dotenv").config()
const mongoos=require('mongoose')
const encrypt=require("mongoose-encryption")

mongoos.connect("mongodb://127.0.0.1:27017/SecretsDB")  

const userSchema=new mongoos.Schema({
    email:String,
    password:String
})



userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:['password'] })

module.exports = mongoos.model('User',userSchema)