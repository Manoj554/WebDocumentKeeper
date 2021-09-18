const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        max:20,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:Number,
    },
    city:{
        type:String,
        trim:true
    },
    message:{
        type:String,
        trim:true
    }
    
},{timestamps:true});

module.exports = mongoose.model('Message',messageSchema);
