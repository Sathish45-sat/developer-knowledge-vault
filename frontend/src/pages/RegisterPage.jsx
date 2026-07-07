import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/home");
    } catch (err) {
      setError("Registration failed. Email or username might be taken.");
    }
  };

  return (
    <div className="full-screen flex-center">
      <div className="auth-container glass-panel animate-fade-in">
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Create Account</h2>
        {error && <div style={{ color: "var(--error)", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              className="premium-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="email"
              className="premium-input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <input
              type="password"
              className="premium-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="premium-btn">
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--text-muted)" }}>
          Already have an account? <Link to="/" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;