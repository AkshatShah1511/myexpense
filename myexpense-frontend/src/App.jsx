import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [page, setPage] = useState(token ? "dashboard" : "login");

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  };

  return (
    <div className="app">
      {page === "login" && (
        <Login onLogin={handleLogin} onSwitch={() => setPage("register")} />
      )}
      {page === "register" && (
        <Register onSwitch={() => setPage("login")} />
      )}
      {page === "dashboard" && (
        <Dashboard token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
