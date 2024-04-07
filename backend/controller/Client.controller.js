import errHandler from "../utlies/error.js"
import Client from "../models/client.modal.js"
 export const Clientside=async(req,res,next)=>{
    console.log(req.body);
     if(req.body.name===''||!req.body.email===''||!req.body.subject===""||!req.body.message===""){
        return next(errHandler(400,"Please fill all the fields"));
     } 

    try{
        const newClient=new Client({
            clientName:req.body.name,
            email:req.body.email,
            subject:req.body.subject,
            message:req.body.message
        });
        await newClient.save();
        res.status(201).json(newClient);
    }catch(error){
        next(error);
    }
} 