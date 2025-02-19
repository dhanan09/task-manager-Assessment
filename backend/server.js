const express= require("express");
const mongoose= require("mongoose");
const dotenv= require("dotenv");
const cors= require("cors");

dotenv.config();

const app=express();

app.use(express.json());
app.use(cors());

//Routes
const authRoutes= require("./routes/auth");
const taskRoutes= require("./routes/taskRoutes");
app.use("/api/tasks",taskRoutes);
app.use("/api/auth",authRoutes);

//Connection to MongoDB
mongoose
.connect(process.env.MONGODB_URL)
.then(()=>{
  console.log("Connected to MongDB"); 
})
.catch((err)=>{
  console.log("Error connection to MongoDB",err);
});
app.listen(process.env.PORT,()=>{
  console.log("Server running on port 5000");
});