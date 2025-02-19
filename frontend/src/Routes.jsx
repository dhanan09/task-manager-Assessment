import{Routes,Route}from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskPage from "./pages/TaskPage";

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/tasks" element={<TaskPage/>}/>
        </Routes>
    );
}

export default AppRoutes;