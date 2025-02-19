import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1 className="heading">Welcome to the Task Manager</h1>
      <p className="subheading">Manage your tasks efficiently.</p>
      <div className="action-buttons">
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </div>
    </div>
  );
}

export default Home;
