import React, { useState, useContext, useEffect } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fallback to user if available
  const displayUser = user || {};

  useEffect(() => {
    if (user) {
      setProfile({
        bio: user.bio || "",
        experienceLevel: user.experienceLevel || "Beginner",
        skills: user.skills ? user.skills.join(", ") : "",
        linkedinUrl: user.socialLinks?.linkedinUrl || "",
        githubUrl: user.socialLinks?.githubUrl || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const updateRequest = {
      bio: profile.bio,
      experienceLevel: profile.experienceLevel,
      skills: profile.skills.split(",").map(s => s.trim()).filter(s => s),
      socialLinks: {
        linkedinUrl: profile.linkedinUrl,
        githubUrl: profile.githubUrl
      }
    };

    try {
      await api.put("/users/profile", updateRequest);
      // Wait to fetch updated user state via context or simply show success
      // A quick reload of window to refresh context state (or manual context update)
      // For simplicity:
      setMessage("Profile updated successfully!");
      setTimeout(() => setIsEditing(false), 1000);
      window.location.reload(); 
    } catch (err) {
      setMessage("Failed to update profile.");
    }
    setSaving(false);
  };

  return (
    <div>
      <nav className="top-nav">
        <div style={{ fontWeight: 800, fontSize: "1.2rem" }}>
          Knowledge Vault
        </div>
        <div className="nav-links">
          <Link to="/community">Community</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/home">My Notes</Link>
          <a href="#" onClick={logout}>Logout</a>
        </div>
      </nav>

      <div className="full-screen" style={{ paddingTop: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Toggle Edit Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="premium-btn" 
            style={{ width: "auto", padding: "0.5rem 1.5rem", borderRadius: "20px", fontSize: "0.9rem" }}
          >
            {isEditing ? "View Profile" : "Edit Profile"}
          </button>
        </div>

        {isEditing ? (
          <div className="glass-panel animate-fade-in">
            <h2 style={{ marginBottom: "2rem" }}>Edit Developer Profile</h2>
            
            {message && (
              <div style={{ 
                padding: "1rem", 
                marginBottom: "1rem", 
                background: message.includes("success") ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                color: message.includes("success") ? "var(--success)" : "var(--error)",
                borderRadius: "8px",
                border: `1px solid ${message.includes("success") ? "var(--success)" : "var(--error)"}`
              }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSave}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-muted)" }}>About Me (Bio)</label>
                <textarea 
                  name="bio"
                  className="premium-input" 
                  rows="4" 
                  value={profile.bio || ""}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div style={{ marginBottom: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Experience Level</label>
                  <select 
                    name="experienceLevel"
                    className="premium-input" 
                    value={profile.experienceLevel || "Beginner"}
                    onChange={handleChange}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Skills (comma separated)</label>
                  <input 
                    type="text"
                    name="skills"
                    className="premium-input" 
                    value={profile.skills || ""}
                    onChange={handleChange}
                    placeholder="Java, React, MongoDB"
                  />
                </div>
              </div>

              <h3 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.2rem" }}>Social Links</h3>
              
              <div style={{ marginBottom: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-muted)" }}>GitHub URL</label>
                  <input 
                    type="url"
                    name="githubUrl"
                    className="premium-input" 
                    value={profile.githubUrl || ""}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                  />
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-muted)" }}>LinkedIn URL</label>
                  <input 
                    type="url"
                    name="linkedinUrl"
                    className="premium-input" 
                    value={profile.linkedinUrl || ""}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <button type="submit" className="premium-btn" disabled={saving}>
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </div>

        ) : (
          
          /* VIEW MODE - LINKEDIN STYLE */
          <div className="glass-panel animate-fade-in" style={{ padding: "0", overflow: "hidden" }}>
            
            {/* Banner Area */}
            <div style={{ 
              height: "150px", 
              background: "linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%)",
              position: "relative"
            }}></div>

            {/* Profile Avatar & Info Area */}
            <div style={{ padding: "0 2rem 2rem 2rem", position: "relative" }}>
              
              {/* Avatar */}
              <div style={{ 
                width: "120px", 
                height: "120px", 
                borderRadius: "50%", 
                background: "var(--bg-dark)", 
                border: "4px solid var(--card-bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                fontWeight: "800",
                color: "var(--text-main)",
                marginTop: "-60px",
                position: "relative",
                zIndex: "1"
              }}>
                {displayUser.username ? displayUser.username.charAt(0).toUpperCase() : "?"}
              </div>

              {/* Identity block */}
              <div style={{ marginTop: "1rem" }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "0.2rem" }}>{displayUser.username}</h1>
                <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", margin: "0" }}>
                  {displayUser.email}
                </p>
                <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
                  <span style={{ 
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "var(--success)",
                    padding: "0.2rem 0.8rem",
                    borderRadius: "15px",
                    fontWeight: "600",
                    fontSize: "0.85rem"
                  }}>
                    {displayUser.experienceLevel || "Level Unknown"}
                  </span>
                </div>
              </div>

              {/* Bio / About */}
              <div style={{ marginTop: "2rem" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.5rem" }}>
                  About
                </h3>
                <p style={{ lineHeight: "1.6", color: "var(--text-main)", whiteSpace: "pre-wrap" }}>
                  {displayUser.bio || "No bio provided yet. Click 'Edit Profile' to add one!"}
                </p>
              </div>

              {/* Skills */}
              <div style={{ marginTop: "2rem" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.5rem" }}>
                  Top Skills
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {displayUser.skills && displayUser.skills.length > 0 ? (
                    displayUser.skills.map((skill, index) => (
                      <span key={index} style={{
                        background: "rgba(59, 130, 246, 0.1)",
                        border: "1px solid rgba(59, 130, 246, 0.3)",
                        padding: "0.4rem 1rem",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "var(--text-main)"
                      }}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: "var(--text-muted)" }}>No skills added.</span>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div style={{ marginTop: "2.5rem" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.5rem" }}>
                  Connect
                </h3>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {displayUser.socialLinks?.githubUrl ? (
                    <a href={displayUser.socialLinks.githubUrl} target="_blank" rel="noreferrer" style={{
                      textDecoration: "none",
                      color: "white",
                      background: "#333",
                      padding: "0.5rem 1.5rem",
                      borderRadius: "8px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      transition: "transform 0.2s"
                    }}>
                      GitHub
                    </a>
                  ) : null}

                  {displayUser.socialLinks?.linkedinUrl ? (
                    <a href={displayUser.socialLinks.linkedinUrl} target="_blank" rel="noreferrer" style={{
                      textDecoration: "none",
                      color: "white",
                      background: "#0077b5",
                      padding: "0.5rem 1.5rem",
                      borderRadius: "8px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      transition: "transform 0.2s"
                    }}>
                      LinkedIn
                    </a>
                  ) : null}

                  {!displayUser.socialLinks?.githubUrl && !displayUser.socialLinks?.linkedinUrl && (
                    <span style={{ color: "var(--text-muted)" }}>No social links connected.</span>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;
