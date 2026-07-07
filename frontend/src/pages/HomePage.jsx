import React, { useEffect, useState } from "react";
import techNoteService from "../services/techNoteService";
import TechNoteList from "../components/TechNoteList";
import ShuffleButton from "../components/ShuffleButton";
import "../styles/home.css";
import { useNavigate, Link } from "react-router-dom";

function HomePage() {

  const [techNotes, setTechNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadTechNotes();
  }, []);

  const loadTechNotes = async () => {
    const data = await techNoteService.getMyTechNotes();
    setTechNotes(data || []);
  };

  const handleRevisit = async (id) => {
    await techNoteService.revisitTechNote(id);
    loadTechNotes();
  };

  const handleEdit = (techNote) => {
    navigate("/edit", { state: techNote });
  };

  const handleDelete = async (techNote) => {
    if (window.confirm("Are you sure you want to delete this tech note?")) {
      try {
        const userId = localStorage.getItem("userId");
        await techNoteService.deleteTechNote(techNote._id || techNote.id, userId);
        loadTechNotes();
      } catch (err) {
        console.error(err);
        alert("Failed to delete techNote");
      }
    }
  };

  const handleShuffle = () => {
    const shuffled = [...techNotes].sort(() => Math.random() - 0.5);
    setTechNotes(shuffled);
  };

  const filteredTechNotes = techNotes.filter((m) => {
    const matchesSearch = (m.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                          (m.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesTag = !tagQuery || (m.tags && m.tags.some(t => t.toLowerCase() === tagQuery.toLowerCase()));
    
    return matchesSearch && matchesTag;
  });

  return (
    <>
      <nav className="top-nav">
        <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--text-main)" }}>
          Knowledge Vault
        </div>
        <div className="nav-links">
          <Link to="/community">Community</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/home">My Notes</Link>
          <Link to="/" onClick={() => localStorage.removeItem("token")}>Logout</Link>
        </div>
      </nav>

      <div className="top-bar" style={{ marginTop: "1rem" }}>
        <div className="top-bar-left">
          <ShuffleButton onShuffle={handleShuffle} />
        </div>
        
        <div className="search-bar">
          <input 
            placeholder="Search notes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input 
            placeholder="Filter exactly by tag..." 
            value={tagQuery}
            onChange={(e) => setTagQuery(e.target.value)}
            style={{ maxWidth: "200px" }}
          />
        </div>

        <div className="top-bar-right">
          <button className="add-btn" onClick={() => navigate("/add")}>
            + Add Tech Note
          </button>
        </div>
      </div>

      <TechNoteList 
        techNotes={filteredTechNotes}
        onRevisit={handleRevisit}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}

export default HomePage;