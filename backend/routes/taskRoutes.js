const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Add a new task
router.post("/", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Task title is required" });
        }

        const newTask = new Task({ title });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

//Update a Task Status
router.put("/:id",async(req,res)=>{
    try{
        const updatedTask= await Task.findByIdAndUpdate(
            req.params.id,
            {completed:req.body.completed},
            {new:true}
        );
        res.json(updatedTask);
    }catch(err){
        res.status(500).json({message:"Server Error"})
    }
})

// Delete a task
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
