const app=require("./index");
const connect=require("./configue/db");

app.listen(5555, async()=>{
    try{
        await connect();
        console.log("run5555")
    }
    catch(err){
        console.error(err.message)
    }
    
})