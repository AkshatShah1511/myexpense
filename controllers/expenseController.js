const express = require("express");
const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");

const getExpenses = asyncHandler(async(req,res)=>{
    const expense = await Expense.find({userid:req.user.id})
    res.status(200).json(expense);
})

const createExpense = asyncHandler (async(req,res)=>{
    const {item,amount} = req.body;
    const e = await Expense.create({
        item,amount,
        userid:req.user.id
    })
    res.json({e})
})


module.exports = {getExpenses,createExpense} 