import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"

function TaskPage() {
  const [tasks, setTasks] = useState([]);  
  const [newTask, setNewTask] = useState("");  

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add Task
  const addTask = () => {
    if (!newTask) return;
    axios.post("http://localhost:5000/api/tasks", { title: newTask })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((err) => console.error(err));
    
    setNewTask("");
  };

  // Toggle Task Completion
const toggleTaskCompletion = (id, currentStatus) => {
    axios
      .put(`http://localhost:5000/api/tasks/${id}`, { completed: !currentStatus }) 
      .then((res) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, completed: !currentStatus } : task
          )
        );
      })
      .catch((err) => console.error("Error updating task:", err));
  };
  

  // Delete Task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)  // ✅ Fixed template string
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="task-wrapper">
      <div className="task-container">
        <h2>Task Manager</h2>
  
        {/* Add Task Input */}
        <div className="task-input">
          <input
            type="text"
            placeholder="Enter task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
  
        {/* Task List */}
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <span className={task.completed ? "completed" : ""}>{task.title}</span>
              <div>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
                <button onClick={() => toggleTaskCompletion(task._id, task.completed)}>
  {task.completed ? "Undo" : "Complete"}
</button>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}

export default TaskPage;
