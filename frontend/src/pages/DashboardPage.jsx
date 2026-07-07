import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/analytics/summary");
        setAnalytics(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <nav className="top-nav">
        <div style={{ fontWeight: 800, fontSize: "1.2rem" }}>
          Knowledge Vault
        </div>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/community">Community</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/home">My Notes</Link>
          <a href="#" onClick={logout}>Logout</a>
        </div>
      </nav>

      <div className="full-screen" style={{ paddingTop: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }} className="animate-fade-in">
          <h1>Welcome, {user?.username}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
            Here's what is happening with your knowledge base today.
          </p>
        </div>

        {loading ? (
          <div>Loading analytics...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <div className="glass-panel animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h3 style={{ color: "var(--text-muted)" }}>Total Notes</h3>
              <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--accent-primary)" }}>
                {analytics?.totalNotes || 0}
              </div>
            </div>
            
            <div className="glass-panel animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 style={{ color: "var(--text-muted)" }}>Favorites</h3>
              <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--accent-secondary)" }}>
                {analytics?.totalFavorites || 0}
              </div>
            </div>

            <div className="glass-panel animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h3 style={{ color: "var(--text-muted)" }}>Total Views</h3>
              <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--success)" }}>
                {analytics?.totalViews || 0}
              </div>
            </div>

            <div className="glass-panel animate-fade-in" style={{ animationDelay: "0.4s", gridColumn: "1 / -1" }}>
              <h3 style={{ marginBottom: "1rem" }}>Top Tags</h3>
              {analytics?.topTags && Object.keys(analytics.topTags).length > 0 ? (
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {Object.entries(analytics.topTags).map(([tag, count]) => (
                    <div key={tag} style={{ 
                      background: "rgba(59, 130, 246, 0.1)", 
                      border: "1px solid rgba(59, 130, 246, 0.3)",
                      padding: "0.5rem 1rem", 
                      borderRadius: "20px" 
                    }}>
                      <span style={{ fontWeight: 600 }}>#{tag}</span> 
                      <span style={{ color: "var(--text-muted)", marginLeft: "0.5rem" }}>({count})</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: "var(--text-muted)" }}>No tags used yet.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
