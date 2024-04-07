import mongoose from "mongoose";
const  clientSchema=mongoose.Schema({
    clientName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});
const Client=mongoose.model("Client",clientSchema);
export default Client