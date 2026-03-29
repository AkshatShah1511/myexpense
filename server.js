const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
PORT = process.env.PORT
const connectDb = require("./config/dbconnection");
connectDb();
const app  = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())
app.use('/users',require('./routes/userRoutes.js'));
app.use("/expense",require("./routes/expenseRoutes.js"));
app.listen(PORT,(req,res)=>{
    console.log("Server up nd running on",PORT);
});