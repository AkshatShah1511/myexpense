const { timeStamp } = require("console");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        reqired : [true]
    },
    email:{
        type:String,
        required:[true]
    },
    password:{
        type:String,
        required:[true]
    }
},{
    timeStamp : true
});
module.exports = mongoose.model("User",userSchema);