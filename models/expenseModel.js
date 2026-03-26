const mongoose = require("mongoose");
const {User} = require("../models/userModel");
const { timeStamp } = require("console");
const expenseSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    item:{
        type:String,
        required:[true],
    },
    amount:{
        type:String,
        required:[true]
    }
},{
    timestamps:true
});
module.exports = mongoose.model("Expense", expenseSchema, "myexpense");