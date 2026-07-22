import React from "react";
import TechNoteCard from "./TechNoteCard";

function TechNoteList({ techNotes, onRevisit, onEdit, onDelete, viewMode = "masonry", onTagClick }) {
  if (!techNotes || techNotes.length === 0) {
    return (
      <div className="no-notes" style={{ 
        padding: "60px 20px", 
        textAlign: "center", 
        color: "#94a3b8",
        fontSize: "1.1rem",
        background: "rgba(255, 255, 255, 0.02)",
        borderRadius: "16px",
        border: "1px dashed rgba(255, 255, 255, 0.1)",
        maxWidth: "600px",
        margin: "40px auto"
      }}>
        📌 No tech notes found. Create a new note or adjust your search filter!
      </div>
    );
  }

  const wallClass = viewMode === "grid" ? "wall-grid" : viewMode === "list" ? "wall-list" : "wall-masonry";

  return (
    <div className={`wall ${wallClass}`}>
      {techNotes.map((m) => (
        <TechNoteCard
          key={m._id || m.id}
          techNote={m}
          onRevisit={onRevisit}
          onEdit={onEdit}
          onDelete={onDelete}
          onTagClick={onTagClick}
        />
      ))}
    </div>
  );
}

export default TechNoteList;

