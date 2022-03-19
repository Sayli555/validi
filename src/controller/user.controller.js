const express=require("express");
const User=require("../model/user.model");
const { body, validationResult } = require('express-validator');
const router=express.Router();

router.post("", body("firstName").trim().not().isEmpty().withMessage("firstname name not be empty"),
                body("lastname").trim().not().isEmpty().withMessage("lastname name not be empty"),   
                body("email").trim().not().isEmpty().isEmail().withMessage("email not be Empty").
                custom(async(value)=>{
                    const user=await User.findOne({email:value});
                    if(user){
                        throw new Error("Email is alreday taken")
                    }
                    return true;
                }),


                body("pincode").trim().not().isEmpty().withMessage("pincode not be empty").isNumeric().
                withMessage("Pincode must be 6 number").custom((value)=>{
                    var string=toString(value)
                    if(string.length==6){
                        throw new Error("Pincode must be 6 number")
                    }
                    return true;
                }),


                body("age").trim().not().isEmpty().withMessage("age not be empty").isNumeric().
                withMessage("age must be in 1 to 100").custom((value)=>{
                    if(value<1 || value>100){
                        throw new Error("age must be in 1 to 100")
                    }
                    return true;
                }),


                body("gender").trim().not().isEmpty().withMessage("gender not be empty"),
               


        async(req,res)=>{
    try{
        console.log(body("firstName"))
        const errors = validationResult(req);
        console.log({errors})
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const user=await User.create(req.body);
        return res.status(201).send({message:user});
    }
    catch(err){
        return res.status(400).send({message:err.message})
    }
})

module.exports=router;