const express=require("express");
const usercontroller=require("./controller/user.controller");
const app=express();

app.use(express.json());

app.use("/user",usercontroller)

module.exports=app