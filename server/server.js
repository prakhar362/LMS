require("dotenv").config();
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");

const app=express();
const PORT=process.env.PORT || 5000;
const MONGO_URI=process.env.MONGO_URI;

cors({
    origin:process.env.CLIENT_URL,
    methods:["GET", "POST" ,"PUT" ,"DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
});

app.use(express.json());

//database setup
mongoose.connect(MONGO_URI)
.then(()=>console.log('MongoDB is Connected'))
.catch((e)=> console.log(e));

//Routes Configuration


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  });

app.listen(PORT,()=>{
    console.log('Server is running on port http://localhost:5000');
})
