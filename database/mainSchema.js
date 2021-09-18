const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        max:20,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        max:20,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    hashPassword:{
        type:String,
        required:true
    },
    documents:[
        {
            document:Object,
            time:{
                type:Date,
                default:Date.now
            }
        }
    ],
},{timestamps:true});

userSchema.virtual('fullName')
.get(function(fname){
    return `${this.firstName} ${this.lastName}`;
});


userSchema.methods ={
    authenticate : async function(password){
        let c =  await bcrypt.compare(password,this.hashPassword);
        return c;
    }
}
module.exports = mongoose.model('appdata',userSchema);
