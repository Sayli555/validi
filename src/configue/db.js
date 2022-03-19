const mongoose=require("mongoose");

const connect=()=>{
    return mongoose.connect("mongodb+srv://sayli:sayli424@cluster0.djisy.mongodb.net/valioation")
}

module.exports=connect;